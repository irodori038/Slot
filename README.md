###スロットゲーム(β版)の仕様について。
※まだ未実装の機能や、画面を整えていなかったりもするのですが、一応最低限の機能はつけたということでβ版としたいと思います。
残り時間や現時点の所持金に「Pocket Calculator」というフォントを文字として使用しているため、このフォントが入っていない環境での動作が保証できません。現時点ではベータ版の更新を停止しています。少し暇ができたら、プログラムの一部を差し替えて画像として出力しようと思っていますので、お待ちください。

・起動した瞬間に初期資金を聞かれます。

・スタートでリールが回転。大体0.86回転/s位。ギリギリ狙えそうとかそのくらいの速さです。
（未実装ですが、大当たりの7とBARは通常では滑って出ない仕様にする予定です。）

・各リールをストップで止めます。

・全部止めると、各行と斜めの5ラインで同じ柄が無いか判定。
(多分同時に複数ライン当たるなんてことは無いと思っているので、適当に探してヒットしたらそれを用いる)

・果物で掛け金の5倍、BARと7で20倍。ただし、掛け金は一定で3コイン(足りない時は残額全て)。

・制限時間は1分。残り時間が0秒になった時にプレイ中ならそのプレイの終了時に終了（のはず）。

・バグが埋まっている可能性が高いです(JavaScriptでゲームを実装したのは今回が初めてなので)。あったら報告お願いします。

※β版では以下に変更点を追記していきます。

###未実装の内容について

・ショートカットキー。5でリール回転開始、123で各リールを止められるように。実際にはこれで客にプレイしてもらいます。

・見栄えを整えたい。画像がなくて辛い。

・効果音及びBGMの追加。
