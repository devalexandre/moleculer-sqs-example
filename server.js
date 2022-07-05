const { ServiceBroker } = require("moleculer");
const SQSTransporter = require("@indevweb/moleculer-transport-amazonsqs");

const transport = new SQSTransporter({
    accessKeyId: "AKIAXNNEHSOTT6YJHDGC",
    secretAccessKey: "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",
    apiVersion: '2012-11-05',
    region: 'us-east-1',
})


// Create a ServiceBroker
const broker = new ServiceBroker({
    nodeID: "match",
    namespace: "calcular",
    transporter: transport,
});

// Define a service
broker.createService({
    name: "calcular",
    actions: {
       async add(ctx) {
           const result = ctx.params.a + ctx.params.b;
            return result
        }
    }

});


broker.start()
    // Call the service
    .then(() => broker.call("calcular.add", { a: 5, b: 3 }))
    // Print the response
    .then(res => {
        console.log("5 + 3 =", res)

    })
    .catch(err => {
        console.error("Error occured!" , err.message)

    });