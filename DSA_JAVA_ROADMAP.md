# 🗺️ 30-Day DSA in Java Roadmap
### March 16 → April 16

> **Goal:** Become comfortable solving average-level DSA problems in Java for college placements and job interviews — in just 30 days.

---

## 🧭 How to Use This Roadmap

| Symbol | Meaning |
|--------|---------|
| 📘 | Concept to learn |
| 💻 | Problems to practice |
| ✅ | Daily checkpoint |
| 🔥 | High-priority interview topic |

**Daily Routine (1–2 hours/day)**
1. Read the concept (20 min)
2. Watch a short YouTube video if needed (10 min)
3. Solve problems (30–45 min)
4. Revise yesterday's topic (10 min)

**Practice Platform:** [LeetCode](https://leetcode.com) · [HackerRank](https://hackerrank.com/domains/java) · [GeeksForGeeks](https://geeksforgeeks.org)

---

## 📅 Week 1 — Java Essentials + Arrays
> *Build your foundation. No skipping this week.*

### Day 1 — March 16 · Java Basics for DSA
📘 **Learn:**
- Primitive types (`int`, `long`, `char`, `boolean`)
- Arrays declaration: `int[] arr = new int[5];`
- `for`, `while`, `for-each` loops
- Basic I/O: `Scanner` and `System.out.println`

💻 **Practice:**
- Print numbers 1–100
- Sum of an array
- Find max and min in an array

✅ Checkpoint: Can you write a Java program from scratch without help?

---

### Day 2 — March 17 · Array Basics
📘 **Learn:**
- Traversal, insertion, deletion
- 2D arrays
- Built-in: `Arrays.sort()`, `Arrays.fill()`

💻 **Practice:**
- Reverse an array
- Check if array is sorted
- Second largest element in array

---

### Day 3 — March 18 · Array Problems – Easy 🔥
💻 **Practice (LeetCode Easy):**
- [Two Sum](https://leetcode.com/problems/two-sum/) — #1
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) — #121
- [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) — #217

✅ Checkpoint: Solved at least 2 of 3?

---

### Day 4 — March 19 · Sliding Window + Two Pointers 🔥
📘 **Learn:**
- Two pointer technique
- Sliding window concept (fixed + variable)

💻 **Practice:**
- Maximum sum subarray of size K
- [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) — #643
- [Move Zeroes](https://leetcode.com/problems/move-zeroes/) — #283

---

### Day 5 — March 20 · Prefix Sum + Frequency Map
📘 **Learn:**
- Prefix sum array
- Counting frequencies using `HashMap`

💻 **Practice:**
- Range sum query (prefix sum)
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) — #560
- Most frequent element in array

---

### Day 6 — March 21 · Strings Basics
📘 **Learn:**
- `String` vs `StringBuilder`
- Methods: `.charAt()`, `.substring()`, `.length()`, `.toCharArray()`
- String is **immutable** in Java

💻 **Practice:**
- Reverse a string
- Check palindrome
- Count vowels and consonants

---

### Day 7 — March 22 · String Problems 🔥
💻 **Practice (LeetCode Easy/Medium):**
- [Valid Anagram](https://leetcode.com/problems/valid-anagram/) — #242
- [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) — #14
- [First Unique Character](https://leetcode.com/problems/first-unique-character-in-a-string/) — #387

✅ **Week 1 Review:** Re-solve your weakest problem from this week.

---

## 📅 Week 2 — LinkedList + Stacks + Queues
> *These are classic interview topics. Nail the patterns.*

### Day 8 — March 23 · Linked List Basics
📘 **Learn:**
- Node structure in Java:
  ```java
  class Node {
      int data;
      Node next;
      Node(int data) { this.data = data; }
  }
  ```
- Traversal, insertion at head/tail, deletion

💻 **Practice:**
- Create and print a linked list
- Insert at beginning, end, and middle
- Delete a node by value

---

### Day 9 — March 24 · Linked List — Classic Problems 🔥
💻 **Practice:**
- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) — #206
- [Middle of Linked List](https://leetcode.com/problems/middle-of-the-linked-list/) — #876
- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) — #141 (Floyd's algorithm)

---

### Day 10 — March 25 · Stack Basics 🔥
📘 **Learn:**
- Stack concept: LIFO (Last In, First Out)
- Java: `Stack<Integer>` or `Deque<Integer>` as stack
- Operations: `push()`, `pop()`, `peek()`, `isEmpty()`

💻 **Practice:**
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) — #20 ← *Asked in almost every interview*
- [Min Stack](https://leetcode.com/problems/min-stack/) — #155
- Reverse a string using stack

---

### Day 11 — March 26 · Queue Basics
📘 **Learn:**
- Queue concept: FIFO (First In, First Out)
- Java: `Queue<Integer> q = new LinkedList<>()`
- Operations: `offer()`, `poll()`, `peek()`
- Deque (Double-ended queue)

💻 **Practice:**
- Implement a queue using two stacks
- [Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/) — #933
- First non-repeating character in a stream

---

### Day 12 — March 27 · HashMap & HashSet 🔥
📘 **Learn:**
- `HashMap<K,V>`: `put()`, `get()`, `containsKey()`, `getOrDefault()`
- `HashSet<K>`: `add()`, `contains()`, `remove()`
- When to use Map vs Set

💻 **Practice:**
- [Two Sum](https://leetcode.com/problems/two-sum/) — #1 (solve it with HashMap this time)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/) — #49
- Intersection of two arrays

---

### Day 13 — March 28 · Recursion Basics
📘 **Learn:**
- Base case + Recursive case
- How the call stack works
- Recursion vs iteration

💻 **Practice:**
- Factorial using recursion
- Fibonacci (naive + memoized)
- Sum of digits using recursion

---

### Day 14 — March 29 · Recursion — Applied Problems
💻 **Practice:**
- [Power of Two](https://leetcode.com/problems/power-of-two/) — #231
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — #70
- Print all subsets of a string (backtracking intro)

✅ **Week 2 Review:** Understand Floyd's cycle detection + valid parentheses pattern.

---

## 📅 Week 3 — Trees + Binary Search
> *Tree problems are asked in 70% of product-based company interviews.*

### Day 15 — March 30 · Binary Tree Basics 🔥
📘 **Learn:**
- Tree node structure:
  ```java
  class TreeNode {
      int val;
      TreeNode left, right;
      TreeNode(int val) { this.val = val; }
  }
  ```
- Tree terminology: root, leaf, height, depth

💻 **Practice:**
- Create a binary tree manually
- Count total nodes
- Find height of tree

---

### Day 16 — March 31 · Tree Traversals 🔥
📘 **Learn:**
- **Inorder** (Left → Root → Right)
- **Preorder** (Root → Left → Right)
- **Postorder** (Left → Right → Root)
- Level-order (BFS using Queue)

💻 **Practice:**
- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) — #94
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) — #102
- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) — #104

---

### Day 17 — April 1 · Binary Search Tree (BST)
📘 **Learn:**
- BST property: left < root < right
- Search, insert in BST
- In-order traversal of BST gives sorted output

💻 **Practice:**
- [Search in BST](https://leetcode.com/problems/search-in-a-binary-search-tree/) — #700
- [Insert into BST](https://leetcode.com/problems/insert-into-a-binary-search-tree/) — #701
- Validate if a tree is a valid BST

---

### Day 18 — April 2 · Tree Problems — Must Solve 🔥
💻 **Practice:**
- [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) — #101
- [Path Sum](https://leetcode.com/problems/path-sum/) — #112
- [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) — #235

---

### Day 19 — April 3 · Binary Search 🔥
📘 **Learn:**
- Binary search on sorted array
- Template:
  ```java
  int lo = 0, hi = n - 1;
  while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (arr[mid] == target) return mid;
      else if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
  }
  ```

💻 **Practice:**
- [Binary Search](https://leetcode.com/problems/binary-search/) — #704
- [First Bad Version](https://leetcode.com/problems/first-bad-version/) — #278
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/) — #35

---

### Day 20 — April 4 · Binary Search — Applied 🔥
💻 **Practice:**
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) — #153
- [Peak Index in Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/) — #852
- [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) — #875

---

### Day 21 — April 5 · Sorting Algorithms
📘 **Learn:**
- Bubble Sort, Selection Sort (understand, not memorize)
- **Merge Sort** (Divide & Conquer) 🔥
- Java built-in: `Arrays.sort()` and `Collections.sort()`

💻 **Practice:**
- Implement Merge Sort
- [Sort Colors](https://leetcode.com/problems/sort-colors/) — #75 (Dutch National Flag)
- [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) — #88

✅ **Week 3 Review:** Can you write tree traversals without looking at notes?

---

## 📅 Week 4 — Dynamic Programming + Graph Intro + Final Prep
> *DP is hard at first. Focus on patterns, not formulas.*

### Day 22 — April 6 · DP Intro — Memoization
📘 **Learn:**
- What is Dynamic Programming?
- Top-down (Memoization) vs Bottom-up (Tabulation)
- Overlapping subproblems + optimal substructure

💻 **Practice:**
- Fibonacci with memoization
- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — #70 (solve with DP)
- [House Robber](https://leetcode.com/problems/house-robber/) — #198 🔥

---

### Day 23 — April 7 · DP — 1D Problems 🔥
💻 **Practice:**
- [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/) — #746
- [Coin Change](https://leetcode.com/problems/coin-change/) — #322
- [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — #53 (Kadane's Algorithm)

---

### Day 24 — April 8 · DP — 2D Problems
📘 **Learn:**
- 2D DP table
- Longest Common Subsequence pattern

💻 **Practice:**
- [Unique Paths](https://leetcode.com/problems/unique-paths/) — #62
- [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) — #1143
- 0/1 Knapsack (classic problem — GeeksForGeeks)

---

### Day 25 — April 9 · Graph Basics
📘 **Learn:**
- Graph representation: Adjacency List
  ```java
  Map<Integer, List<Integer>> graph = new HashMap<>();
  ```
- BFS (Breadth-First Search) using Queue
- DFS (Depth-First Search) using Stack/Recursion

💻 **Practice:**
- BFS traversal of a graph
- DFS traversal of a graph
- [Number of Islands](https://leetcode.com/problems/number-of-islands/) — #200 🔥

---

### Day 26 — April 10 · Graph Problems 🔥
💻 **Practice:**
- [Flood Fill](https://leetcode.com/problems/flood-fill/) — #733
- [Clone Graph](https://leetcode.com/problems/clone-graph/) — #133
- Detect cycle in undirected graph (DFS + visited set)

---

### Day 27 — April 11 · Mixed Revision Day 🔥
> *Go back and solve problems you found hard.*

📋 **Revisit:**
- Two Sum (HashMap approach)
- Valid Parentheses
- Reverse Linked List
- Binary Search template
- Climbing Stairs (DP)

💻 **Timed practice:** Try to solve 3 easy LeetCode problems in 45 minutes.

---

### Day 28 — April 12 · Interview Patterns
📘 **Key Patterns to Know:**
| Pattern | Example Problem |
|---------|----------------|
| Two Pointers | Move Zeroes, Container With Most Water |
| Sliding Window | Max Subarray of Size K |
| Fast & Slow Pointer | Linked List Cycle |
| BFS / Level Order | Binary Tree Level Order |
| Stack for Brackets | Valid Parentheses |
| DP Tabulation | House Robber, Coin Change |

💻 **Practice:**
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) — #11
- [3Sum](https://leetcode.com/problems/3sum/) — #15

---

### Day 29 — April 13 · Java-Specific Interview Tips
📘 **Java Collections Cheat Sheet:**
```java
// Dynamic array
ArrayList<Integer> list = new ArrayList<>();

// Stack
Deque<Integer> stack = new ArrayDeque<>();

// Queue
Queue<Integer> queue = new LinkedList<>();

// Priority Queue (Min Heap)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

// HashMap
HashMap<String, Integer> map = new HashMap<>();

// HashSet
HashSet<Integer> set = new HashSet<>();
```

📘 **Always remember:**
- Use `Integer.MAX_VALUE` and `Integer.MIN_VALUE` for edge cases
- Avoid `int` overflow: use `long` or `lo + (hi - lo) / 2` in binary search
- `String.valueOf(num)` converts int to String

---

### Day 30 — April 14 · Mock Interview Day
> *Simulate a real interview. No hints. Timed.*

⏱️ **45-minute Mock Test — Solve these 3 problems:**
1. [Two Sum](https://leetcode.com/problems/two-sum/) — #1 (5 min)
2. [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) — #20 (10 min)
3. [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) — #53 (15 min)

🗣️ **While solving, say out loud:**
- "My approach is..."
- "The time complexity is O(...) because..."
- "Edge cases: empty array, single element, all negatives..."

---

### Day 31–32 — April 15–16 · Final Revision + Rest
📋 **Final Checklist:**

- [ ] Can solve Two Sum in < 5 minutes
- [ ] Understand linked list reversal
- [ ] Know stack/queue difference + use cases
- [ ] Can write binary search from memory
- [ ] Understand recursion & base cases
- [ ] Know Inorder/Preorder/Level-order traversal
- [ ] Solved Climbing Stairs with DP
- [ ] Know BFS for graphs/trees
- [ ] Understand time/space complexity basics

🧘 **Rest your mind. You've worked hard for 30 days.**

---

## ⏱️ Time & Space Complexity — Quick Reference

| Data Structure | Access | Search | Insert | Delete |
|---------------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Stack/Queue | O(n) | O(n) | O(1) | O(1) |
| HashMap | — | O(1) | O(1) | O(1) |
| Binary Search | — | O(log n) | — | — |
| BST (balanced) | — | O(log n) | O(log n) | O(log n) |
| Sorting | — | — | O(n log n) | — |

---

## 📚 Resources

| Resource | Link | Best For |
|----------|------|----------|
| LeetCode | [leetcode.com](https://leetcode.com) | Coding practice |
| GeeksForGeeks | [geeksforgeeks.org](https://geeksforgeeks.org) | Concept explanations |
| Striver's DSA Sheet | [takeuforward.org/strivers-a2z-dsa-course](https://takeuforward.org/data-structure/strivers-a2z-dsa-course-sheet-2/) | Structured problem list |
| Neetcode.io | [neetcode.io](https://neetcode.io) | Pattern-based roadmap |
| YouTube: Kunal Kushwaha | Java DSA playlist | Beginner-friendly Java DSA |
| YouTube: Abdul Bari | Algorithm lectures | Clear algorithm explanations |

---

## 🏁 Progress Tracker

| Week | Topic | Status |
|------|-------|--------|
| Week 1 (Mar 16–22) | Java + Arrays + Strings | ⬜ Not started |
| Week 2 (Mar 23–29) | LinkedList + Stack + Queue + HashMap | ⬜ Not started |
| Week 3 (Mar 30–Apr 5) | Trees + Binary Search + Sorting | ⬜ Not started |
| Week 4 (Apr 6–12) | DP + Graphs + Patterns | ⬜ Not started |
| Final (Apr 13–16) | Revision + Mock Interview | ⬜ Not started |

> **Update this table as you progress. ✅ = Done · 🔄 = In Progress · ⬜ = Not Started**

---

*You don't need to be perfect. You need to be consistent. One hour a day for 30 days will get you there.* 🚀
