package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
    "math/rand"
    "time"
)

func activityNotifications(input []int, d int) int {
    var out int
    max := input[0]
    for _,x := range input {
        if max < x {
            max = x
        }
    }
    fw := make([]int, max+1)
    l := len(input)
    for i := 0; i < d; i++ {
        v := input[i]
        for j := v; j < max; j |= j+1 {
            fw[j]++
        }
        //fmt.Println("+", v, fw);
    }
    mb := max
    mb |= mb >> 1
    mb |= mb >> 2
    mb |= mb >> 4
    mb |= mb >> 8
    mb |= mb >> 16
    mb |= mb >> 32
    mb = (mb >> 1) + 1
    var rb []int
    for i := mb; i > 0; i >>=1 {
        rb = append(rb, i)
    }
    var md, ms int
    md = (d-1)/2 + 1
    ms = d/2 + 1
    var same bool
    same = d%2 != 0
    for i := d; i < l; i++ {
        var x, y, left, mid int
        for _, r:= range rb {
            if x+r < max {
                mid = left + fw[x+r-1]
                if mid < md {
                    x += r
                    left = mid
                }
            }
        }
        if same {
            y = x
        } else {
            y, left, mid = 0, 0, 0
            for _, r:= range rb {
                if y+r < max {
                    mid = left + fw[y+r-1]
                    if mid < ms {
                        y += r
                        left = mid
                    }
                }
            }
        }
        if x + y <= input[i] {
            out++
        }
        v := input[i-d]
        for j := v; j < max; j |= j+1 {
            fw[j]--
        }
        //fmt.Println("-", v, fw)
        v = input[i]
        for j := v; j < max; j |= j+1 {
            fw[j]++
        }
        //fmt.Println("+", v, fw)
    }
    return out
}

func main() {
    rand.Seed(time.Now().UnixNano())
    reader := bufio.NewReaderSize(os.Stdin, 1024 * 1024)

    stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 1024 * 1024)

    nd := strings.Split(readLine(reader), " ")

    nTemp, err := strconv.ParseInt(nd[0], 10, 64)
    checkError(err)
    n := int(nTemp)

    dTemp, err := strconv.ParseInt(nd[1], 10, 64)
    checkError(err)
    d := int(dTemp)

    expenditureTemp := strings.Split(readLine(reader), " ")

    var expenditure []int

    for i := 0; i < int(n); i++ {
        expenditureItemTemp, err := strconv.ParseInt(expenditureTemp[i], 10, 64)
        checkError(err)
        expenditureItem := int(expenditureItemTemp)
        expenditure = append(expenditure, expenditureItem)
    }

    result := activityNotifications(expenditure, d)

    fmt.Fprintf(writer, "%d\n", result)

    writer.Flush()
}

func readLine(reader *bufio.Reader) string {
    str, _, err := reader.ReadLine()
    if err == io.EOF {
        return ""
    }

    return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}

