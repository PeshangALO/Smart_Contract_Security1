const Cats = artifacts.require('Cats'); // this is contract name, not file name.
const Proxy = artifacts.require('Proxy');
const CatsUpdated = artifacts.require('CatsUpdated'); 

module.exports = async function(deployer, network, accounts){
    // deploying the contract. deploying instance.
    // await  because it is a aysinc function.
    const cats = await Cats.new();
    // Proxy constract need a address for the functional contract. In this case it is "cats".
    const proxy = await Proxy.new(cats.address);

    // Take Proxy source code.
    //.at(): truffle function that create instance of Cats contract, but doing that
    // from already exciting deployed contract "proxy"

    // Fooling truffle by saying that we have a dog address lockated at "proxy.address"
    // Set number of cats to 10 through the proxy
    var proxyCat = await Cats.at(proxy.address);
    await proxyCat.setNumberOfCats(10);
    // get the number of cats.
    var nrOfCats = await proxyCat.getNumberOFCats();
    //toNumber: to be readable.
    console.log("Before Update: " + nrOfCats.toNumber())

    // in this way the data is saved in proxy contrcat and not in functional contract.
    
    // updated the contract
    const catsupdated = await CatsUpdated.new();
    proxy.upgrade(catsupdated.address);

    // Fool truffle once again. It now thinks proxyCat has  all functions.
    proxyCat = await CatsUpdated.at(proxy.address);
    // Initialize proxy state. 0 is the owner, and not 1
    proxyCat.initialize(accounts[0]);

    // Chech so that storage remined.
    var nrOfCats = await proxyCat.getNumberOFCats();
    //toNumber: to be readable.
    console.log("After Update: " + nrOfCats.toNumber())
    // Set the nr of cats thorugh the proxy with NEW FUNCtional contract.
    await proxyCat.setNumberOfCats(30);
    // Check so that setNumberOfCats worked with the new functional contract.
    var nrOfCats = await proxyCat.getNumberOFCats();
    console.log("After change: " + nrOfCats.toNumber())


}