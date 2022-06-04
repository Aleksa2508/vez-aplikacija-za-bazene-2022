export default interface ITokenData {
    role: "administrator" | "user";
    id: number;
    identity: string;
}