package com.sparsearray;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

public class SparseArray {

	public static void main(String[] args) throws Exception {
		// 定义一个原始棋盘数组，默认值为0
		int chessArr[][] = new int[11][11];
		// 第二行第三列有白子
		chessArr[1][2] = 1;
		// 第三行第四列有黑子
		chessArr[2][3] = 2;
		// 输出原始数组
		System.out.println("原始数组");
		for (int[] row : chessArr) {
			for (int data : row) {
				System.out.printf("%d\t", data);
			}
			System.out.println();
		}
		// 遍历原始数组，得到非空的值
		int count = 0;// 计数，统计非空数值个数
		for (int i = 0; i < 11; i++) {
			for (int j = 0; j < 11; j++) {
				if (chessArr[i][j] != 0)// 如果非空
					count++;// 计数器加加
			}
		}

		// 将原数组转换成稀疏数组

		// 定义一个稀疏数组，行数为原数组非空值个数+1，列数为3
		int sparseArr[][] = new int[count + 1][3];
		// 头信息：
		sparseArr[0][0] = 11;// 第一行第一列记录原数组行数
		sparseArr[0][1] = 11;// 第一行第二列记录原数组列数
		sparseArr[0][2] = count;// 第一行第三列记录原数组非空数值个数
		// 遍历原数组,num用于计数
		for (int i = 0, num = 1; i < 11; i++) {
			for (int j = 0; j < 11; j++) {
				if (chessArr[i][j] != 0) {// 如果非空
					// 稀疏数组存储该值的行、列、值
					sparseArr[num][0] = i;
					sparseArr[num][1] = j;
					sparseArr[num][2] = chessArr[i][j];
					num++;
				}
			}
		}
		System.out.println("稀疏数组为：");
		for (int i = 0; i < sparseArr.length; i++) {
			System.out.printf("%d\t%d\t%d\t\n", sparseArr[i][0], sparseArr[i][1], sparseArr[i][2]);
		}
		System.out.println();

		// 将稀疏数组还原成原数组
		int row = sparseArr[0][0];// 总行数
		int col = sparseArr[0][1];// 总列数
		int chessArr2[][] = new int[row][col];
		for (int i = 1; i < sparseArr.length; i++) {
			chessArr2[sparseArr[i][0]][sparseArr[i][1]] = sparseArr[i][2];
		}
		System.out.println("还原的数组为：");
		for (int i = 0; i < row; i++) {
			for (int j = 0; j < col; j++) {

				System.out.printf("%d\t", chessArr2[i][j]);
			}
			System.out.println();
		}

		writerSparseArr(sparseArr);
		rederSparseArr();
	}

	public static void writerSparseArr(int[][] sparseArr) throws Exception {
		// 将稀疏数组写入文件,创建一个字符缓冲输出流
		BufferedWriter bw = new BufferedWriter(new FileWriter("D:/sparseArr.txt"));
		for (int[] rows : sparseArr) {
			for (int data : rows) {
				bw.write(data + "\t");// 写入数据，加一个制表符
			}
			bw.newLine();// 换行
		}
		bw.close(); // 释放资源，将内存缓冲去的数据刷新到文件中
		System.out.println("文件写入成功");
	}

	public static int[][] rederSparseArr() throws Exception {
		// 将稀疏数组写入文件,创建字符缓冲输出流
		BufferedReader br1 = new BufferedReader(new FileReader("D:/sparseArr.txt"));// 第一个用于获取文件有多少行，方便定义稀疏数组
		BufferedReader br2 = new BufferedReader(new FileReader("D:/sparseArr.txt"));// 第二个用于获取数据
		String line;
		int count = 0;// 记录文件有多少行
		int row = 0;
		while ((line = br1.readLine()) != null) {
			count++;// 每有一行，count++
		}
		int sparseArr[][] = new int[count][3];// 创建一个稀疏数组用于获取数据
		while ((line = br2.readLine()) != null) {
			String[] temp = line.split("\t");// 定义一个字符串数组存储
			for (int i = 0; i < temp.length; i++) {
				sparseArr[row][i] = Integer.parseInt(temp[i]);
			}
			row++;
		}
		System.out.println("从文件读取的稀疏数组");
		for (int[] rows : sparseArr) {
			for (int data : rows) {
				System.out.printf("%d\t", data);
			}
			System.out.println();
		}
		br1.close();
		br2.close();
		return sparseArr;
	}
}