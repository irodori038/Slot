スロットゲーム(α版)の仕様について。

・起動した瞬間に初期資金を聞かれます。

・スタートでリールが回転。大体1.5回転/s位。各リールで速さが違います。
一見遅そうに見えますが、各リールには役が20個7種類が振り分けられているので、かなり速いです。

・各リールをストップで止めます。

・全部止めると、各行と斜めの5ラインで同じ柄が無いか判定。(多分同時に複数ライン当たるなんてことは無いと思っているので、適当に探してヒットしたらそれを用いる)

・果物で掛け金の5倍、BARと7で20倍。ただし、掛け金は一定で3コイン(足りない時は残額全て)。

・リール判定にバグが存在するので、右側にコンピュータの判断した絵柄を数値化して出してます。
replay-0
バナナ-1
スイカ-2
オレンジ-3
さくらんぼ-4
BAR-5
7-6
として扱っています。(ここに違うものが表示されていたら列のパターンのデータをくれると助かります。)

・他にもバグが埋まっている可能性が高いです(JavaScriptでゲームを実装したのは今回が初めてなので)。あったら報告お願いします。

未実装の内容について
・ショートカットキー。5でリール回転開始、123で各リールを止められるようにしたいけど、その仕組み知らない。JQuery?
・UIを整える。画像素材探そう。
・効果音及びBGMの追加。
・RePlayとGAMEOVER時の画面遷移で、setTimeOut関数を用いているが、時間差にならないので、そこの調整。
