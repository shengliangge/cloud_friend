package com.sort;

import com.sun.org.apache.xpath.internal.SourceTree;

public class InsertSort {
    //插入排序
    public static void main(String[] args) {
        int arr[] = {8, 9, 1, 5, 2, 10, 3};
        insertSort2(arr);
        for (int i : arr) {
            System.out.println(i);
        }
    }

    //    实现思路1
    public static int[] insertSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            for (int j = 0; j < i; j++) {
                if (arr[i] < arr[j]) {
                    int temp = arr[i];
                    for (int k = i; k > j; k--) {
                        arr[k] = arr[k - 1];
                    }
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

    //实现思路2,优化版
    public static int[] insertSort2(int[] arr) {
        int insertValue=0;//插入值
        int insertIndex=0;//插入下标
        for (int i = 1; i < arr.length; i++) {
           insertValue = arr[i];//待插入的值
            insertIndex = i - 1;
            while (insertIndex >= 0 && arr[insertIndex] > insertValue) {
                arr[insertIndex + 1] = arr[insertIndex];//将前一个向后移动一位
                insertIndex--;
            }
            //结束循环时，找到了要插入的位置的前一个位置，并且已经将其他的数后移
            if(insertIndex+1!=i){
                arr[insertIndex+1]=insertValue;
            }

        }
        return arr;
    }
}

