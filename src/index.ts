import RabbitmqServer from "./factory/rabbinq-server.ts";

async function main() {
  try {
    const url = process.env.RABBITMQ_URL || 'amqp://localhost';
    const queueName = process.env.RABBITMQ_QUEUE || 'minha-fila';
    const rabbit = new RabbitmqServer(url);

    await rabbit.start();

    await rabbit.consume(queueName, (mensagem) => {
      try {
        console.log('📨 Mensagem recebida:', mensagem);
        // Aqui entra seu processamento real
      } catch (erro) {
        console.error('❌ Erro ao processar a mensagem:', erro);
      }
    });

    console.log('🚀 Microserviço consumidor rodando. Aguardando mensagens...');

    // Nada mais aqui! O processo se mantém vivo porque o RabbitMQ está escutando.
  } catch (erro) {
    console.error('🚨 Falha ao iniciar o consumidor:', erro);
    process.exit(1);
  }
}

main();