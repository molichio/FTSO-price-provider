import { Base } from './Base';

let yargs = require("yargs");

// Args parsing
let args = yargs
    .option('recipientAddress', {
        alias: 'a',
        type: 'string',
        description: 'Set the address of other allowed recipient in the `ftsoRewardManager.claim`.',
        demand: true
    })
    .option('setEmpty', {
        alias: 'e',
        type: 'boolean',
        description: 'Set the addresses of other allowed recipient in the `ftsoRewardManager.claim` to empty.',
        demand: false
    })
    .argv;


class SetAllowedClaimRecipient extends Base {

    public async run():Promise<void> {
        await this.init('SetAllowedClaimRecipient');

        let addresses: string[]; 
        if (args.setEmpty && args.recipientAddress) {
                throw new Error(`cannot use both setEmpty and recipientAddress`)
        } else if (args.recipientAddress) {
            let recipientAddress: string = args.recipientAddress;
            if(!this.web3.utils.isAddress(recipientAddress)) {
                throw new Error(`recipientAddress must be a valid evm checksum address`);
            } else {
                addresses = [recipientAddress];
            }
        } else if (args.setEmpty) {
            addresses = [];
        } else {
            throw new Error(`need either setEmpty or recipientAddress`)
        }

        let receipt: any = await this.signAndFinalize3("SetAllowedClaimRecipients", this.ftsoRewardManagerContract.options.address, this.ftsoRewardManagerContract.methods.setAllowedClaimRecipients(addresses));
        if(receipt) {
            this.logger.info(`Succesfully set allowed claim recipients! Transaction hash: ${receipt.transactionHash}`);
        }
    }
}

new SetAllowedClaimRecipient().run().then(() => process.exit(0));