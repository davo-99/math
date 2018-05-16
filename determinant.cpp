// #include "stdafx.h"
#include <iostream>
#include <cmath>

using namespace std;

#define MAX 10

void SwapRows(double[][MAX], int, int, int);
void SortMatrix(double[][MAX], int&, int);
double Diagonal(double[][MAX], int);
void GaussElimination(double[][MAX], int, int);
double Determinant(double[][MAX], int);

int main() {
	int n;
	double matrix[10][10];
	cout << "Nermucir matrici chapsy\n";
	do { cin >> n; } while (n < 2 || n > 10);
	cout << "Nermucir matrici tvery\n";
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			cin >> matrix[i][j];
	cout << Determinant(matrix, 4) << endl;
	system("pause");
	return 0;
}

void SwapRows(double mat[][MAX], int i, int j, int n) {
	// cout << "Swapping the " << i+1 << " and " << j+1 << " rows" << endl;
	for (int k = 0; k < n; k++) {
		double temp = mat[i][k];
		mat[i][k] = mat[j][k];
		mat[j][k] = temp;
	}
}

void SortMatrix(double matrix[][MAX], int& swapped, int n) {
	int nonZeros = 0;
	int j = 0;
	for (int i = 0; i < n - 1; i++) {
		if (matrix[i][j] != 0) {
			nonZeros++;
			if (nonZeros == n - 1) {
				j++;
				i = -1;
			}
			continue;
		}
		int index = i + 1;
		while (index < n) {
			if (matrix[index][j] != 0) break;
			index++;
		}
		if (index == n) index--;
		if (matrix[index][j] != 0) {
			SwapRows(matrix, i, index, n);
			swapped++;
			continue;
		}
		if (j == n) break;
		j++;
		i--;
	}
}

double Diagonal(double matrix[][MAX], int n) {
	double det = 1;
	for (int i = 0; i < n; i++)
		det *= matrix[i][i];
	return det;
}

void GaussElimination(double matrix[][MAX], int index, int n) {
	double* row = matrix[index];
	for (int i = index + 1; i < n; i++) {
		if (*(row + index) == 0) continue;
		double k = -(matrix[i][index] / *(row + index));
		for (int j = index + 1; j < n; j++)
			matrix[i][j] += k * *(row + j);
		matrix[i][index] = 0;
	}
}

double Determinant(double matrix[][MAX], int n) {
	int swapCount = 0;
	SortMatrix(matrix, swapCount, n);
	for (int i = 0; i < n - 1; i++)
		GaussElimination(matrix, i, n);
	double result = Diagonal(matrix, n) * pow(-1, swapCount) + 0;
	return result;
}
