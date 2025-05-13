import { Connection, Queue } from "amqp-ts";

export default class RabbitmqServer {
  private conn: Connection;
  private queues: Map<string, Queue> = new Map();
  private consumers: Set<string> = new Set();

  constructor(private readonly url: string) {
    this.conn = new Connection(this.url);
  }

  /**
   * Inicia a conexão (a biblioteca já se conecta automaticamente ao instanciar)
   */
  async start(): Promise<void> {
    await this.conn.completeConfiguration();
    console.log("RabbitMQ conectado com sucesso.");
  }

  /**
   * Declara uma fila se ainda não existir e retorna
   */
  async getQueue(queueName: string): Promise<Queue> {
    if (this.queues.has(queueName)) {
      return this.queues.get(queueName)!;
    }

    const queue = this.conn.declareQueue(queueName, { durable: true });
    await queue.initialized;
    this.queues.set(queueName, queue);
    return queue;
  }


   /**
   * Consome mensagens de uma fila
   */
   async consume(queueName: string, callback: (payload: any) => void): Promise<void> {
    if (this.consumers.has(queueName)) return; // já consumindo
  
    const queue = await this.getQueue(queueName);
  
    queue.activateConsumer((message) => {
      try {
        const content = message.getContent();
        callback(content);
        message.ack();
      } catch (error) {
        console.error(`Erro ao processar mensagem da fila "${queueName}":`, error);
        message.nack();
      }
    });
  
    this.consumers.add(queueName);
  }

  /**
   * Fecha a conexão com o RabbitMQ
   */
  async close() {
    await this.conn.close();
    console.log('Conexão com RabbitMQ encerrada.');
  }
}
