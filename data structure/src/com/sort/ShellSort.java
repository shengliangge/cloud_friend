package com.sort;

import com.sun.media.sound.SoftTuning;

public class ShellSort {
    public static void main(String[] args) {
        int[] arr = {8, 9, 1, 7, 2, 3, 5, 4, 6, 0};
        shellSort(arr);
    }

    public static void shellSort(int[] arr) {
//        思路，分组进行比较交换，得出相对有序
        //外层循环，按照分组的数量来进行循环(10/2)循环5次
        for (int step = arr.length / 2; step > 0; step /= 2) {
            //二层循环，根据分组后，有多少组就循环多少次。
//            for(int i=step;i<;i-=5){
//            三层循环，按照每个分组的组内数量来做比较
            for (int j = step; j + step < arr.length; j++) {
                if (arr[j] > arr[j + step]) {
                    int temp = arr[j];
                    arr[j] = arr[j + step];
                    arr[j + step] = temp;
                }
            }
//            }
            System.out.println("第" + step + "次循环:");
            for (int i : arr) {
                System.out.print(i);
            }
            System.out.println();
        }
    }
}
