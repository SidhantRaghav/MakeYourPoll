#include <bits/stdc++.h>
using namespace std;
int main() {
	// #ifndef ONLINE_JUDGE
	// freopen("input.txt","r",stdin);
	// freopen("output.txt","w",stdout);
	// #endif
	int c = 0;
	string s = "123465cchwd";
	for (int i = 0; i < s.length(); i++) {
		if (s[i] >= '0' && s[i] <= '9') {
			c++;
		}
	} cout << c << endl;
	int x = (int)(s[0] - '0');
	cout << ++x;
	return 0;
}