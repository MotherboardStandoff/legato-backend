import { Length, isNotEmpty, IsNotEmpty } from "class-validator";

export class CreateArtist {

    @Length(1, 255)
    @IsNotEmpty()
    public name: string;

    constructor(artistName: string) {

        this.name = artistName;
    }
}