import { Base } from './Base';

let yargs = require("yargs");

// Args parsing
let args = yargs
    .option('executorAddress', {
        alias: 'a',
        type: 'string',
        description: 'Set the address of other executor allowed to call `ftsoRewardManager.claim`.',
        demand: false
    }) 
    .option('setEmpty', {
        alias: 'e',
        type: 'boolean',
        description: 'Set the addresses of other executors allowed to call `ftsoRewardManager.claim` to empty.',
        demand: false
    }) 
    .argv;


class SetClaimExecutors extends Base {

    public async run():Promise<void> {
        await this.init('SetClaimExecutors');

        let addresses: string[]; 
        if (args.setEmpty && args.executorAddress) {
                throw new Error(`cannot use both setEmpty and executorAddress`)
        } else if (args.executorAddress) {
            let executorAddress: string = args.executorAddress;
            if(!this.web3.utils.isAddress(executorAddress)) {
                throw new Error(`executorAddress must be a valid evm checksum address`);
            } else {
                addresses = [executorAddress];
            }
        } else if (args.setEmpty) {
            addresses = [];
        } else {
            throw new Error(`need either setEmpty or executorAddress`)
        }

        let receipt: any = await this.signAndFinalize3("SetClaimExecutors", this.ftsoRewardManagerContract.options.address, this.ftsoRewardManagerContract.methods.setClaimExecutors(addresses));
        if(receipt) {
            this.logger.info(`Succesfully set claim executors! Transaction hash: ${receipt.transactionHash}`);
        }
    }
}

new SetClaimExecutors().run().then(() => process.exit(0));