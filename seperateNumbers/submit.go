package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
)

func sp(s string, ol int) (bool, int, bool, int64) {
    l := ol
    first,_ := strconv.ParseInt(s[0:ol], 10, 64)
    c := first
    found := false
    for l+l <= len(s) && !found {
        next,_ := strconv.ParseInt(s[l:l+l], 10, 64)
        if c+1 == next {
            found = true
        } else if (l+l+1 <= len(s)) {
            next,_ = strconv.ParseInt(s[l:l+l+1], 10, 64)
            if c+1 == next {
                found = true
            }
        }
        if !found {
            l++;
            c,_ = strconv.ParseInt(s[0:l], 10, 64)
        }
    }
    if !found {
        return true, 0, false, 0
    }
    first = c
    fl := l
    p := l
    pass := true
    for p+l <= len(s) {
        found = false
        //fmt.Print("current: ", c)
        next,_ := strconv.ParseInt(s[p:p+l], 10, 64)
        //fmt.Print(" next: ", next, " sp ", s[p])
        if c+1 == next && (l < 2 || (l > 1 && s[p] != 48)) {
            p += l
            c = next
            //fmt.Println(" HIT ")
            found = true
        } else if p+l+1 <= len(s) {
            next,_ = strconv.ParseInt(s[p:p+l+1], 10, 64)
            //fmt.Print(" but next: ", next, " sp ", s[p])
            if c+1 == next && (l < 2 || (l > 1 && s[p] != 48)) {
                l++
                p += l
                c = next
                //fmt.Println(" HIT ")
                found = true
            }
        }
        if !found {
            pass = false
            break
        }
    }
    //fmt.Println("l", l, "p+l, ", p+l, " vs ", len(s))
    if p+l > len(s) {
      if p != len(s) {
        pass = false
      }
    }
    if pass {
        return false, fl, true, first
    } else {
        return false, fl, false, 0
    }
}

// Complete the separateNumbers function below.
func separateNumbers(s string) {
    critical, fl, found, first := sp(s, 1)
    l := fl + 1
    //fmt.Println("Try l", l, " and ", critical, " ", fl, " ", found, " ", first)
    for !critical && !found && l+l <= len(s) {
        //fmt.Println("loop ", l)
        //fmt.Println("Try l", l, " and ", critical, " ", fl, " ", found, " ", first)
        critical, fl, found, first = sp(s, l)
        l = fl + 1
    }
    if found {
        fmt.Println("YES", first)
    } else {
        fmt.Println("NO")
    }
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 1024 * 1024)

    qTemp, err := strconv.ParseInt(readLine(reader), 10, 64)
    checkError(err)
    q := int32(qTemp)

    for qItr := 0; qItr < int(q); qItr++ {
        s := readLine(reader)

        separateNumbers(s)
    }
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

