import {TypedKey} from "./game";

export class GameResults {
    constructor(private typedKeys: TypedKey[], public seconds: number) {}
    public keys(): TypedKey[] {
        return this.typedKeys;
    }

    public keysPerMinute(): number {
        return Math.floor(this.typedKeys.filter(key => key.correct).length / (this.seconds / 60))
    }

    public toString(): string {
        const correctRate = (this.typedKeys.filter((key: TypedKey) => key.correct).length
                / this.typedKeys.length * 100).toFixed(2);

        return `You typed ${correctRate} % right. You typed ${this.keysPerMinute()} keys per minute`;
    }
}