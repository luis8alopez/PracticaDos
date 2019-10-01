export function separate(sequence: string): string[] {
    let aux = '';
    let expression: string[] = [];
    for (let index = 0; index < sequence.length; index++) {
        if (sequence[index] === '<') {
            do {
                aux += sequence[index];
                index++;
            } while (sequence[index] !== '>');
            aux += sequence[index];
            expression.push(aux);
            aux = '';
        } else {
            expression.push(sequence[index]);
        }
    }
    return expression;
}

export function permutation(collection: string[]) {
    var current,
        subarray,
        result = [],
        currentArray = [],
        newResultArray = [];
    if (collection.length) {
        current = collection.shift();
        result = permutation(collection);
        currentArray.push(current);
        result.map(function (list) {
            newResultArray.push(list.slice(0));
            list.push(current);
        });
        result.push(currentArray);
        result = result.concat(newResultArray);
    }

    return result;
};

export function perm(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if (!rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

export function onlyUnique(value: any, index: number, self: any) {
    return self.indexOf(value) === index;
}

function separateTAndNT(sequence: string): string[] {
    let terminals = ['a', 'b', 'c', 'e', 'f', 'g', 'h'];
    let noTerminals = ['<A>', '<B>', '<D>', '<E>', '<H>'];
    let aux = '';
    let expression: string[] = [];
    console.log(sequence);
    for (let index = 0; index < sequence.length; index++) {
        if (sequence[index] == '<') {
            do {
                aux += sequence[index];
                index++;
            } while (sequence[index] != '>');
            aux += sequence[index];

            expression.push(aux);
            aux = '';
        } else {
            expression.push(sequence[index]);
        }
    }
    return expression;
}
