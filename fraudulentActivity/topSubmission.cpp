#include "bits/stdc++.h"
using namespace std;
#define rep(i,n) for(int (i)=0;(i)<(int)(n);++(i))
#define rer(i,l,u) for(int (i)=(int)(l);(i)<=(int)(u);++(i))
#define reu(i,l,u) for(int (i)=(int)(l);(i)<(int)(u);++(i))
static const int INF = 0x3f3f3f3f; static const long long INFL = 0x3f3f3f3f3f3f3f3fLL;
typedef vector<int> vi; typedef pair<int, int> pii; typedef vector<pair<int, int> > vpii; typedef long long ll;
template<typename T, typename U> static void amin(T &x, U y) { if(y < x) x = y; }
template<typename T, typename U> static void amax(T &x, U y) { if(x < y) x = y; }

template<typename It>
void make_fenwick(It beg, size_t n) {
	for(size_t i = 0; i < n; i ++) {
		size_t p = i | (i + 1);
		if(p < n) beg[p] += beg[i];
	}
}
template<typename It, typename Val>
void add_fenwick(It beg, size_t n, size_t i, Val val) {
	for(; i < n; i |= i + 1) beg[i] += val;
}
template<typename It, typename Val>
Val sum_fenwick(It beg, size_t i, Val sum) {
	for(; i > 0; i = i & (i - 1)) sum += beg[i - 1];
	return sum;
}
template<typename It>
typename std::iterator_traits<It>::value_type sum_fenwick(It beg, size_t i) {
	return sum_fenwick(beg, i, typename std::iterator_traits<It>::value_type());
}

size_t highestOneBit(size_t v) {
	v |= v >> 1;
	v |= v >> 2;
	v |= v >> 4;
	v |= v >> 8;
	v |= v >> 16;
#if SIZE_MAX > 0xffffffffULL
	v |= v >> 32;
#endif
	return (v >> 1) + 1;
}

template<typename It, typename Val, typename Cmp>
size_t search_fenwick(It beg, size_t n, Val val, Val left, Cmp cmp) {
	if(!cmp(left, val)) return 0;
	size_t i = 0;
	for(size_t w = highestOneBit(n); w > 0; w >>= 1) {
		if(i + w <= n) {
			Val mid = left;
			mid += beg[i + w - 1];
			if(cmp(mid, val)) {
				i += w;
				left = mid;
			}
		}
	}
	return i + 1;
}

template<typename It, typename Val>
size_t select_fenwick(It beg, size_t n, Val k) {
	return search_fenwick(beg, n, k + 1, Val(), std::less<Val>()) - 1;
}


int main() {
	int n; int d;
	while(~scanf("%d%d", &n, &d)) {
		vector<int> A(n);
		for(int i = 0; i < n; ++ i)
			scanf("%d", &A[i]);
		int X = *max_element(A.begin(), A.end());
		vector<int> ft(X + 1, 0);
		rep(i, d) add_fenwick(ft.begin(), ft.size(), A[i], 1);
		int ans = 0;
		rep(i, n - d) {
			int x = select_fenwick(ft.begin(), ft.size(), (d - 1) / 2);
			int y = select_fenwick(ft.begin(), ft.size(), d / 2);
			if(x + y <= A[i + d])
				++ ans;
			add_fenwick(ft.begin(), ft.size(), A[i], -1);
			add_fenwick(ft.begin(), ft.size(), A[i + d], 1);
		}
		printf("%d\n", ans);
	}
	return 0;
}
