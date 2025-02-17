import type { Adapter, WalletError } from "@solana/wallet-adapter-base";
import type { Cluster } from "@/types/web3";
import type { Ref } from "vue";

export type WalletStoreProps = {
  wallets?: Adapter[] | Ref<Adapter[]>;
  autoConnect?: boolean | Ref<boolean>;
  cluster?: Cluster | Ref<Cluster>;
  onError?: (error: WalletError, adapter?: Adapter) => void;
  localStorageKey?: string;
};
