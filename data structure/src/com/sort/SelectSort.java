package com.sort;

public class SelectSort {
    public static void main(String[] args) {
        int arr[] = {8, 9, 1, 5, 2, 10, 3};
        for (int i = 0; i < arr.length - 1; i++) {
            int min = arr[i];
            int index = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (min > arr[j]) {
                    min = arr[j];
                    index = j;
                }
            }
            if (index != i) {
                arr[index] = arr[i];
                arr[i] = min;
            }
            for (int v : arr) {
                System.out.print(v + " ");
            }
            System.out.println();
        }
    }
}
