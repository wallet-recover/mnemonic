import axios from "axios";

export const getBalance = async (address: string) => {
    const params = {
      chainid: 1,
      module: 'account',
      action: 'balance',
      address,
      tag: 'latest',
      apikey: import.meta.env.VITE_ETHERSCAN_API_KEY as string,
    }
    const response = await axios.get(import.meta.env.VITE_ETHERSCAN_BASE_URL as string, { params });
    if (response.data.status === '1') {
        return response.data.result;
    }   
    return undefined;
}
