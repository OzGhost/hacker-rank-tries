package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
)

// Complete the freqQuery function below.
func freqQuery(queries [][]int32) []int32 {
    var rs []int32
    t := 0
    k, s := make(map[int32]int32), make(map[int32]int)
    for _, q := range queries {
        x := q[1]
        if q[0] == 1 {
            //fmt.Println("Add ", x, " <<<<<<<<<<<<<<<<<<<<<<<<")
            s[k[x]]--
            k[x]++
            s[k[x]]++
        } else if q[0] == 2 {
            //fmt.Print("Delete ", x, " xxxxxxxxxxxxxxxxxxxxxxxxxxx")
            if k[x] > 0 {
                s[k[x]]--
                s[k[x]-1]++
                k[x]--
                fmt.Print(" do delete");
            }
            fmt.Println();
        } else if q[0] == 3 {
            t++
            //fmt.Println("Question wish: ", x, "====================================")
            //for a,b := range k {
              //fmt.Println("have: ", a, b)
            //}
            //for a,b := range s {
              //fmt.Println("counted: ", a, b)
            //}
            //if t > 85 {
              //return rs
            //}
            if s[x] > 0 {
                rs = append(rs, 1)
            } else {
                rs = append(rs, 0)
            }
        }
    }
    return rs
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 16 * 1024 * 1024)

    stdout, err := os.Create("/tmp/output_v1")
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 16 * 1024 * 1024)

    qTemp, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
    checkError(err)
    q := int32(qTemp)

    var queries [][]int32
    for i := 0; i < int(q); i++ {
        queriesRowTemp := strings.Split(strings.TrimRight(readLine(reader)," \t\r\n"), " ")

        var queriesRow []int32
        for _, queriesRowItem := range queriesRowTemp {
            queriesItemTemp, err := strconv.ParseInt(queriesRowItem, 10, 64)
            checkError(err)
            queriesItem := int32(queriesItemTemp)
            queriesRow = append(queriesRow, queriesItem)
        }

        if len(queriesRow) != 2 {
            panic("Bad input")
        }

        queries = append(queries, queriesRow)
    }

    ans := freqQuery(queries)

    for i, ansItem := range ans {
        fmt.Fprintf(writer, "%d", ansItem)

        if i != len(ans) - 1 {
            fmt.Fprintf(writer, "\n")
        }
    }

    fmt.Fprintf(writer, "\n")

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

