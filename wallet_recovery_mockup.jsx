import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "sonner";

const WalletRecovery = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);

  const dummyWallets = [
    {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      balance: "1.234 ETH",
      privateKey: "76f841c58e557084a7ac44282c58fe709478398180aa4d054d081c0c0231c11a",
    },
    {
      address: "0x5678123490abcdef5678123490abcdef56781234",
      balance: "0.567 ETH",
      privateKey: "76f841c58e557084a7ac44282c58fe709478398180aa4d054d081c0c0231c11a",
    },
    {
      address: "0x90abcdef1234567890abcdef1234567890abcdef",
      balance: "0.001 ETH",
      privateKey: "76f841c58e557084a7ac44282c58fe709478398180aa4d054d081c0c0231c11a",
    },
    {
      address: "0xcdef1234567890abcdef1234567890abcdef1234",
      balance: "3.210 ETH",
      privateKey: "76f841c58e557084a7ac44282c58fe709478398180aa4d054d081c0c0231c11a",
    },
    {
      address: "0x11223344556677889900aabbccddeeff00112233",
      balance: "5.000 ETH",
      privateKey: "76f841c58e557084a7ac44282c58fe709478398180aa4d054d081c0c0231c11a",
    },
  ];

  const handleRecover = () => {
    // Dummy wallets for mockup
    setWallets(dummyWallets);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Private Key copied to clipboard");
    });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Recover Wallet from Mnemonic</h1>
      <Input
        type="text"
        placeholder="Enter your 12-word mnemonic..."
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleRecover} className="mb-6">
        Recover
      </Button>

      {wallets.map((wallet, index) => (
        <Card key={index} className="mb-4">
          <CardContent className="p-4">
            <p className="font-mono text-sm">Address: {wallet.address}</p>
            <p className="text-sm mb-2">Balance: {wallet.balance}</p>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(wallet.privateKey)}
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
