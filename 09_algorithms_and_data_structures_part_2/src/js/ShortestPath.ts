export type Graph = {[key: string]: any};

type Results = {
    distance: number,
    path: Array<string>
}

export class ShortestPath {
    private readonly distances: Graph = {};
    private readonly graph: Graph;
    private readonly startNode: string;
    private readonly endNode: string;
    private node: string | null;
    private parents: Graph = { endNode: null };
    private visited: Array<string> = [];

    constructor(graph: Graph, startNode: string, endNode: string) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.graph = graph;

        this.distances[endNode] = "Infinity";
        this.distances = Object.assign(this.distances, graph[startNode]);

        for (let child in graph[startNode]) {
            this.parents[child] = startNode;
        }

        this.node = this.shortestDistanceNode(this.distances, this.visited);
        this.findPath();
    }

    private shortestDistanceNode(distances: Graph, visited: Array<string>) {
        let shortest = null;

        for (let node in distances) {
            let currentIsShortest =
                shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    }

    private findPath() {
        while (this.node) {
            // find its distance from the start node & its child nodes
            let distance = this.distances[this.node];
            let children = this.graph[this.node];
            // for each of those child nodes
            for (let child in children) {
                // make sure each child node is not the start node
                if (String(child) === String(this.startNode)) {
                    continue;
                } else {
                    // save the distance from the start node to the child node
                    let newdistance = distance + children[child];
                    // if there's no recorded distance from the start node to the child node in the distances object
                    // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                    // save the distance to the object
                    // record the path
                    if (!this.distances[child] || this.distances[child] > newdistance) {
                        this.distances[child] = newdistance;
                        this.parents[child] = this.node;
                    }
                }
            }
            // move the node to the visited set
            this.visited.push(this.node);
            // move to the nearest neighbor node
            this.node = this.shortestDistanceNode(this.distances, this.visited);
        }

        let shortestPath = [this.endNode];
        let parent = this.parents[this.endNode];
        while (parent) {
            shortestPath.push(parent);
            parent = this.parents[parent];
        }
        shortestPath.reverse();

        // the shortest path from start node to end node & its distance
        const results: Results = {
            distance: this.distances[this.endNode],
            path: shortestPath,
        };
        console.log(results);
        // return results
    }

}