package com.sort;

public class SelectSort {
    public static void main(String[] args) {
        int arr[] = {8, 9, 1, 5, 2, 10, 3};
        for (int i = 0; i < arr.length - 1; i++) {
            int min = arr[i];//给min赋初始值
            int index = i;//给min的下标赋初始值
            for (int j = i + 1; j < arr.length; j++) {//for循环查找最小的数
                if (min > arr[j]) {
                    min = arr[j];//记录最小值
                    index = j;//记录最小下标
                }
            }
            if (index != i) {//说明找到了比arr[i]更小的值
                arr[index] = arr[i];//交换两个数的位置
                arr[i] = min;
            }
            for (int v : arr) {
                System.out.print(v + " ");
            }
            System.out.println();
        }
    }
}
