export class Artist {

    public id: string;
    public name: string;
    public createdAt: string;
    public updatedAt: string;

    constructor(artistID: string, artistName: string, createdAt: string, updatedAt: string) {

        this.id = artistID;
        this.name = artistName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}