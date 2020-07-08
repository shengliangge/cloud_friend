package com.linkedlist;

public class DoubleLinkedListDemo {
    public static void main(String[] args) {
        System.out.println("双向链表的测试");
        HeroNode2 hero1 = new HeroNode2(1, "宋江", "及时雨");
        HeroNode2 hero2 = new HeroNode2(2, "卢俊义", "玉麒麟");
        HeroNode2 hero3 = new HeroNode2(3, "林冲", "及豹子头");
        HeroNode2 hero4 = new HeroNode2(4, "鲁智深", "花和尚");
        DoubleLinkedList doubleLinked = new DoubleLinkedList();
        doubleLinked.addOrder(hero3);
        doubleLinked.addOrder(hero1);
         doubleLinked.addOrder(hero4);
         doubleLinked.addOrder(hero2);
        doubleLinked.addOrder(hero2);
        doubleLinked.list();
        // System.out.println("修改");
        // HeroNode2 hero5 = new HeroNode2(1, "肖琪", "母老虎");
        // doubleLinked.update(hero5);
        // doubleLinked.list();
        // System.out.println("删除");
        // doubleLinked.delete(3);
        // doubleLinked.list();
    }
}

// 创建一个双向链表的类
class DoubleLinkedList {
    private HeroNode2 head = new HeroNode2(0, "", "");

    // 返回头结点
    public HeroNode2 getHead() {
        return head;
    }

    // 遍历双向链表的方法
    public void list() {
        if (head.next == null) {
            // 链表为空
            System.out.println("链表为空");
            return;
        }
        HeroNode2 cur = head.next;
        while (cur != null) {
            System.out.println(cur);
            cur = cur.next;
        }
    }

    // 双向链表有序添加
    public void addOrder(HeroNode2 heroNode) {
        HeroNode2 temp = head;
        // 链表为空，直接添加
        // if (temp.next == null) {// 链表为空，直接添加
        // temp.next = heroNode;
        // heroNode.pre = temp;
        // return;
        // }
        while (true) {
            if (temp.next == null) {
                temp.next = heroNode;
                heroNode.pre = temp;
                break;
            }
            if (temp.next.no > heroNode.no) {
                heroNode.pre = temp;
                temp.next.pre=heroNode;
                heroNode.next = temp.next;
                temp.next=heroNode;

                break;
            } else if (temp.next.no == heroNode.no) {
                System.out.println("编号冲突,添加失败");
                break;
            }
            temp = temp.next;
        }
    }

    // 双向链表添加方法,新添加的节点在链表最后
    public void add(HeroNode2 heroNode) {
        HeroNode2 temp = head;
        while (true) {
            if (temp.next == null) {
                break;
            }
            temp = temp.next;
        }
        // 循环结束后，已经到链表最后,进行添加,形成双向链表
        temp.next = heroNode;
        heroNode.pre = temp;
    }

    // 双向链表更新一个节点
    public void update(HeroNode2 newHeroNode) {
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        // 定义一个辅助变量
        HeroNode2 temp = head.next;
        boolean flag = false;
        while (temp != null) {
            if (temp.no == newHeroNode.no) {
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if (flag) {
            temp.name = newHeroNode.name;
            temp.nickname = newHeroNode.nickname;
        } else {
            System.out.println("没有找到");
        }
    }

    // 双向链表删除一个节点
    public void delete(int no) {
        if (head.next == null) {
            System.out.println("链表为空，不能删除");
            return;
        }
        // 定义辅助变量
        HeroNode2 temp = head.next;
        while (temp != null) {
            if (temp.no == no) {
                if (temp.next != null) {
                    temp.pre.next = temp.next;
                    temp.next.pre = temp.pre;
                } else {
                    temp.pre.next = null;
                    temp.pre = null;
                }
            }
            temp = temp.next;
        }
    }
}

class HeroNode2 {
    public int no;
    public String name;
    public String nickname;
    public HeroNode2 next;// 指向后一个节点，默认为null
    public HeroNode2 pre;// 指向前一个节点，默认为null

    public HeroNode2(int no, String name, String nickname) {
        this.no = no;
        this.name = name;
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "HeroList [no=" + no + ", name=" + name + ", nickname=" + nickname + "]";
    }

}