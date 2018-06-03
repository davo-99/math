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
    
    const _fix = number => +number.toFixed(10);
    
    const _isAllZero = matrix =>
        matrix.every(row => !row[0]);
    
    const _argmax = (matrix, h,  k) => {
        const length = matrix.length;
        let max = Math.abs(matrix[h][k]);
        let index = h;
        for (let i = h + 1; i < length; i++)
            if (Math.abs(matrix[i][k]) > max) {
                max = Math.abs(matrix[i][k]);
                index = i;
            }
        return index;
    };
    
    const _diagonal = matrix => {
        let det = 1;
        for (let i = 0; i < matrix.length; i++)
            det *= matrix[i][i];
        return det;
    };
    
    const _swapRows = (matrix, i, j) =>
        [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
    
    const _gaussElimination = (matrix, counter) => {
        const length = matrix.length;
        for (let h = 0, k = 0; h < length && k < length; k++) {
            let i_max = _argmax(matrix, h, k);
            if (matrix[i_max][k] === 0) continue;
            else {
                if (i_max !== h) {
                    _swapRows(matrix, h, i_max);
                    counter.swapped++;
                }
                for (let i = h + 1; i < length; i++) {
                    let f = matrix[i][k] / matrix[h][k];
                    matrix[i][k] = 0;
                    for (let j = k + 1; j < length; j++)
                        matrix[i][j] -= matrix[h][j] * f;
                }
                h++;
            }
        }
        return matrix;
    };
    
    const countDeterminant = matrix => {
        if (!_isValidMatrix(matrix)) return null;
        if (_isAllZero(matrix)) return 0;
        const counter = { swapped: 0 };
        matrix = _gaussElimination(matrix, counter);
        let result = _diagonal(matrix) * (-1) ** counter.swapped + 0;
        return _fix(result);
    };
    
    return {
        det: countDeterminant
    };

})();

export default Matrix;
