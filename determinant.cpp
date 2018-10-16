#include <iostream>
#include <iomanip>
#include <cmath>

using namespace std;

#define MAX 20

void PrintMatrix(double[][MAX], int);
bool IsAllZero(double[][MAX], int);
int ArgMax(double[][MAX], int, int, int);
double Diagonal(double[][MAX], int);
void SwapRows(double[][MAX], int, int, int);
int GaussElimination(double[][MAX], int);
double Determinant(double[][MAX], int);

int main() {
	ios::sync_with_stdio(false);
	int n;
	double matrix[20][20];
	cout << "Set matrix dimension\n";
	do cin >> n; while (n < 2 || n > 20);
	cout << "Input matrix numbers\n";
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			cin >> matrix[i][j];
	PrintMatrix(matrix, n);
	cout << setprecision(5) << fixed << "determinant = " << Determinant(matrix, n) << endl;
	cin.get();
}

void PrintMatrix(double matrix[][MAX], int n) {
	for (int i = 0; i < n; i++)
		for (int j = 0; j < n; j++)
			cout << matrix[i][j] << "\t\n"[n-j==1];
}

bool IsAllZero(double matrix[][MAX], int n) {
	for (int i = 0; i < n; i++)
		if (matrix[i][0] != 0) return false;
	return true;
}

int ArgMax(double matrix[][MAX], int h, int k, int n) {
	int max = fabs(matrix[h][k]);
	int index = h;
	for (int i = h + 1; i < n; i++) {
		if (fabs(matrix[i][k]) > max) {
			max = fabs(matrix[i][k]);
			index = i;
		}
	}
	return index;
}

double Diagonal(double matrix[][MAX], int n) {
	double det = 1;
	for (int i = 0; i < n; i++)
		det *= matrix[i][i];
	return det;
}

void SwapRows(double mat[][MAX], int i, int j, int n) {
	for (int k = 0; k < n; k++) {
		double temp = mat[i][k];
		mat[i][k] = mat[j][k];
		mat[j][k] = temp;
	}
}

int GaussElimination(double matrix[][MAX], int n) {
	int swapCount = 0;
	for (int h = 0, k = 0; h < n && k < n; k++) {
		int i_max = ArgMax(matrix, h, k, n);
		if (matrix[i_max][k] == 0) continue;
		else {
			if (i_max != h) {
				SwapRows(matrix, h, i_max, n);
				swapCount++;
			}
			for (int i = h + 1; i < n; i++) {
				double f = matrix[i][k] / matrix[h][k];
				matrix[i][k] = 0;
				for (int j = k + 1; j < n; j++)
					matrix[i][j] -= matrix[h][j] * f;
			}
			h++;
		}
	}
	return swapCount;
}

double Determinant(double matrix[][MAX], int n) {
	if (IsAllZero(matrix, n)) return 0;
	int swapCount = GaussElimination(matrix, n);
	double result = Diagonal(matrix, n) * pow(-1, swapCount) + 0;
	return result;
}
