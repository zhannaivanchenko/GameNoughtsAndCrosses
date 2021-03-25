class Matrix {
    _db = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    getDb() {
        return this._db;
    }

    getDbCell(x,y) {
        return this._db[x][y];
    }

    setDb(x, y, value) {
        this._db[x][y] = value;
    }
}

export const matrix = new Matrix();
