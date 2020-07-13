package com.sort;

import com.sun.media.sound.SoftTuning;

public class ShellSort {
    public static void main(String[] args) {
        int[] arr = {8, 9, 1, 7, 2, 3, 5, 4, 6, 0, -1};
        shellSort2(arr);
    }

    //交换法实现
    public static void shellSort(int[] arr) {
        int temp;
        //第一层循环：每次分组进行排序，，排序后继续分组，直到只剩一组，进行最后一次排序
        for (int gap = arr.length / 2; gap > 0; gap /= 2) {
            //第二层循环，从分组步长开始
            for (int i = gap; i < arr.length; i++) {
                //第三层循环，对每组组内的进行排序
                for (int j = i - gap; j >= 0; j -= gap) {
                    if (arr[j] > arr[j + gap]) {//如果组内的前面元素大于后面的元素，则交换量元素的位置
                        temp = arr[j];
                        arr[j] = arr[j + gap];
                        arr[j + gap] = temp;
                    }
                }

            }
            for (int i : arr) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }

    //对交换式的希尔排序进行优化->移位法
    public static void shellSort2(int[] arr) {
        for (int gap = arr.length / 2; gap > 0; gap /= 2) {
            //从第gap元素开始，逐个对其所在的组进行直接插入排序
            for (int i = gap; i < arr.length; i++) {
                int j = i;
                int temp = arr[j];
                if (arr[j] < arr[j - gap]) {
                    while (j - gap >= 0 && temp < arr[j - gap]) {
                        //移动
                        arr[j] = arr[j - gap];
                        j -= gap;
                    }
                    //当退出while后，就给temp找到了插入的位置
                    arr[j] = temp;
                }
            }
            for (int i : arr) {
                System.out.print(i+" ");
            }
            System.out.println();
        }
    }
}
