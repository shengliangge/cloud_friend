package com.sort;

public class BubbleSort {
    public static void main(String[] args) {
        int temp = 0;
        int[] arr = {3, 9, -1, 10, -2};
        boolean flag = false;
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    flag = true;
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
            if (!flag) {
                break;
            } else {
                flag = false;
            }
        }
        System.out.println("排序后");
        for (int i : arr) {
            System.out.println(i);
        }

    }
}
