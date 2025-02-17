import type { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import type { PublicKey } from "@solana/web3.js";
import { computed } from "vue";
import type { Ref } from "vue";
import { useWallet } from "./useWallet";

export interface AnchorWallet {
  publicKey: PublicKey;
  signTransaction: SignerWalletAdapterProps["signTransaction"];
  signAllTransactions: SignerWalletAdapterProps["signAllTransactions"];
}

export function useAnchorWallet(): Ref<AnchorWallet | undefined> {
  const walletStore = useWallet();

  return computed<AnchorWallet | undefined>(() => {
    // Ensure the wallet store was initialised by a WalletProvider.
    if (!walletStore) return;

    // Ensure the wallet is connected and supports the right methods.
    const { signTransaction, signAllTransactions, publicKey } = walletStore;
    if (
      !publicKey.value ||
      !signTransaction.value ||
      !signAllTransactions.value
    )
      return;

    return {
      publicKey: publicKey.value,
      signTransaction: signTransaction.value,
      signAllTransactions: signAllTransactions.value,
    };
  });
}
