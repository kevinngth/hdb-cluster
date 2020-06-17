// Global variables

const OCCUPIED = "+";

// Helper functions

const searcher = (clusters, coord, currentCluster, hdb) => {
    const { i, j } = coord;
    const neighbours = [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
    ];
    neighbours.forEach((neighbour) => {
        const [x, y] = neighbour;
        const outOfBound =
            x < 0 || x >= hdb.length || y < 0 || y >= hdb[0].length;
        const newCoord = { i: x, j: y };
        if (!outOfBound && !isAlreadyVisited(newCoord, clusters)) {
            if (hdb[x][y] === OCCUPIED) {
                clusters[currentCluster].push(newCoord);
                return searcher(clusters, newCoord, currentCluster, hdb);
            }
        }
    });
};

const isAlreadyVisited = (coord, clusters) => {
    let isVisited = false;
    if (clusters[0]) {
        clusters.forEach((cluster) => {
            cluster.forEach((existingCoord) => {
                if (
                    existingCoord.i === coord.i &&
                    existingCoord.j === coord.j
                ) {
                    isVisited = true;
                }
            });
        });
    }
    return isVisited;
};

const processor = (input) => {
    const hdb = input.split("\n").map((x) => x.split(""));
    return hdb;
};

const toCoord = (i, j) => {
    return i + "" + (j + "");
};

// Main function
const starterFunction = (input) => {
    const clusters = [];
    const hdb = processor(input);

    for (let i = 0; i < hdb.length; i++) {
        const floor = hdb[i];
        for (let j = 0; j < floor.length; j++) {
            const unit = hdb[i][j];
            const coord = { i, j };
            if (unit === OCCUPIED && !isAlreadyVisited(coord, clusters)) {
                const currentCluster = clusters.length;
                clusters.push([coord]);
                searcher(clusters, coord, currentCluster, hdb);
            }
        }
    }
    console.log(clusters);
    return clusters.length;
};

module.exports = { starterFunction, isAlreadyVisited };
