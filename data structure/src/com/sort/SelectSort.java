package com.sort;

public class SelectSort {
    public static void main(String[] args) {
        int arr[] = {8, 9, 1, 5, 2, 10, 3};
        int min;
        int index = -1;
        for(int i=0;i<arr.length-1;i++){
            min = arr[i];
            index=i;
            for (int j = i+1; j < arr.length; j++) {
                if (min > arr[j]) {
                    min = arr[j];
                    index = j;
                }
            }
            arr[index] = arr[i];
            arr[i] = min;
            for (int v : arr) {
                System.out.print(v + " ");
            }
            System.out.println();
        }


//        min = arr[1];
//        for (int j = 1; j < arr.length - 1; j++) {
//
//            if (min > arr[j]) {
//                min = arr[j];
//                index = j;
//            }
//        }
//        temp = arr[1];
//        arr[1] = arr[index];
//        arr[index] = temp;
//        System.out.println();


    }
}
