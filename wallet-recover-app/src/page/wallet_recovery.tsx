import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { toast, Toaster } from "sonner";
import { ethers } from "ethers";
import { validateMnemonic, mnemonicToSeed } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { getBalance } from "../service/etherscan";

interface Wallet {
  address: string;
  balance: string;
  privateKey: string;
  isShowPrivateKey: boolean;
}

const WalletRecovery = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const handleRecover = async () => {
    const isValid = validateMnemonic(mnemonic, wordlist);
    if (!isValid) {
      toast.error("Invalid mnemonic");
      return;
    }
    const seed = await mnemonicToSeed(mnemonic);
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);
    const derivedWallets: Wallet[] = [];
    for (let i = 0; i < 5; i++) {
      const child = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
      const balance = await getBalance(child.address);
      derivedWallets.push({
        address: child.address,
        balance: balance ? balance + ' ETH' : '-',
        privateKey: child.privateKey,
        isShowPrivateKey: false,
      });
    }
    setWallets(derivedWallets);
    toast.success("Wallets recovered!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Private Key copied to clipboard");
    });
  };

  const handleShowPrivateKey = (index: number) => {
    const newWallets = [...wallets];
    newWallets[index].isShowPrivateKey = !newWallets[index].isShowPrivateKey;
    setWallets(newWallets);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Recover Wallet from Mnemonic</h1>
      <Input
        type="text"
        placeholder="Enter your 12-word mnemonic..."
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
        className="mb-4 w-full"
      />
      <Button onClick={handleRecover} className="mb-6 bg-black font-normal text-sm">
        Recover
      </Button>

      {wallets?.map((wallet, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="p-4">
            <p className="font-mono text-sm cursor-pointer" onClick={() => handleShowPrivateKey(index)}>Address: {wallet.address}</p>
            <p className="text-sm">Balance: {wallet.balance}</p>
            {wallet.isShowPrivateKey && (
              <p className="text-sm">Private Key: {wallet.privateKey}</p>
            )}
            <Button
              variant="outline"
              onClick={() => copyToClipboard(wallet.privateKey)}
              className="font-medium px-2 py-1 text-sm mt-2"
            >
              Copy Private Key
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WalletRecovery;
