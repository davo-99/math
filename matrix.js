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
        const length = matrix.length;
        let det = 1;
        for (let i = 0; i < length; i++)
            det *= matrix[i][i];
        return (det + 0, det); // -0 is an undesirable result
    };
    
    const _gaussElimination = (row, matrix, index) => {
        const length = matrix.length;
        for (let i = index + 1; i < length; i++) {
            let k = -(matrix[i][index] / row[index]);
            for (let j = index + 1; j < length; j++)
                matrix[i][j] += k * row[j];
        }
        return matrix;
    };
      
    const countDeterminant = matrix => {
        if (!_isValidMatrix(matrix)) return null;
        const length = matrix.length;
        for (let i = 0; i < length - 1; i++)
            matrix = _gaussElimination(matrix[i], matrix, i);
        return _diagonal(matrix);
    };
    
    return {
        det: countDeterminant
    };

})();

export default Matrix;
