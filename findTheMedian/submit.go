package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
)

// Complete the findMedian function below.
func findMedian(arr []int32) int32 {
    var max int32
    for _,x := range arr {
        if x > max {
            max = x
        }
    }
    cter := make([]int32, max+1)
    for _,x := range arr {
        cter[x]++
    }
    tg := int32(len(arr)/2)+1
    max++
    var ctt int32
    for i:=0;i<int(max);i++ {
        ctt += cter[i]
        if ctt >= tg {
            return int32(i)
        }
    }
    return -1
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 1024 * 1024)

    stdout, err := os.Create("/tmp/out")
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 1024 * 1024)

    nTemp, err := strconv.ParseInt(readLine(reader), 10, 64)
    checkError(err)
    n := int32(nTemp)

    arrTemp := strings.Split(readLine(reader), " ")

    var arr []int32

    for i := 0; i < int(n); i++ {
        arrItemTemp, err := strconv.ParseInt(arrTemp[i], 10, 64)
        checkError(err)
        arrItem := int32(arrItemTemp)
        arr = append(arr, arrItem)
    }

    result := findMedian(arr)

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

