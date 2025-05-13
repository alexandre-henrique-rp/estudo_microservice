

export default class DiscordiServer {
    
    constructor(
      private readonly message: string,
    ) {}       
    
    
    async sendMessage() {
        try {
          const send = await fetch(`https://discordapp.com/api/webhooks/1371646006059471001/_ox683BfWiC6pIl0CbEJe_5DFtFsywZt_9nCkSIlZ0P4fn9WIHtJ0mV9e6IvoCfVAG70`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: this.message,
            }),
          });

          if (!send.ok) {
            throw new Error(`Erro ao enviar mensagem: ${send.statusText}`);
          }

          console.log('Mensagem enviada com sucesso!');
        } catch (error) {
          console.error('Erro ao enviar mensagem:', error);
        }
    }
}
