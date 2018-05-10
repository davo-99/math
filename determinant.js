const Matrix = (() => {
    "use strict";
    
    const _isArray = matrix => Array.isArray(matrix);
        
    const _isMatrix = matrix => 
        _isArray(matrix) && matrix.every(array => _isArray(array));
        
    const _isSquare = matrix =>
        matrix.every(array => array.length === matrix.length);
    
    const _isValidMatrix = matrix => {
        if (!_isMatrix(matrix)) throw new Error('Must be a matrix');
        if (!_isSquare(matrix)) throw new Error('Must be a square matrix');
        return true;
    };
    
    const _diagonal = matrix => {
        let det = 1;
        for (let i = 0; i < matrix.length; i++) {
            det *= matrix[i][i];
        }
        return (det += 0, det); // -0 is an undesirable result
    };

    const _swapRows = (matrix, i, j) => {
        // console.log(`Swapping the ${i+1} and ${j+1} rows`);
        [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
        return matrix;
    };

    const _sortMatrix = (matrix, counter) => {
        const length = matrix.length;
        let countedNoNZeros = 0;
        let j = 0;
        for (let i = 0; i < length - 1; i++) {
            if (matrix[i][j] !== 0) {
                countedNoNZeros++;
                if (countedNoNZeros === length - 1) {
                    j++;
                    i = -1;
                }
                continue;
            }
            let index = i + 1;
            while (index < length) {
                if (matrix[index][j] !== 0) break;
                index++;
            }
            if (index === length) index--;
            if (matrix[index][j] !== 0) {
                matrix = _swapRows(matrix, i, index);
                counter.swapped++;
                continue;
            }
            if (j === length) break;
            j++;
            i--;
        }
        return matrix;
    };

    const _gaussElimination = (matrix, index) => {
        const row = matrix[index];
        const length = matrix.length;
        for (let i = index + 1; i < length; i++) {
            if (row[index] === 0) continue;
            let k = -(matrix[i][index] / row[index]);
            for (let j = index + 1; j < length; j++)
                matrix[i][j] += k * row[j];
            matrix[i][index] = 0;
        }
        return matrix;
    };
      
    const countDeterminant = matrix => {
        if (!_isValidMatrix(matrix)) return null;
        const counter = { swapped: 0 }; // for reference
        matrix = _sortMatrix(matrix, counter);
        for (let i = 0; i < matrix.length - 1; i++)
            matrix = _gaussElimination(matrix, i);
        let result = Math.trunc(Math.floor(_diagonal(matrix)) * Math.pow(-1, counter.swapped) + 0); // -0 is an undesirable result
        return result;
    };
    
    return {
        det: countDeterminant
    };

})();

export default Matrix;
