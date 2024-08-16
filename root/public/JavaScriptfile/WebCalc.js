/**
 * 
 */
function update( _v ){ // input tag を更新する関数
        document.querySelector( 'input' ).value = _v;
}

function append( _v ){// 数字ボタンが押されたので数字を後ろに追加する
        document.querySelector( 'input' ).value += _v;
}

function calc(){ // 「＝」ボタンが押されたので計算する
        const v = document.querySelector( 'input' ).value
        try {
            const f = new Function( 'return ' + v )
            update( f().toString() )
        } catch( _error ) {
            update( _error ) // 計算に失敗した場合は、そのエラーの内容を表示する
        }
        update( f().toString() );
}

	
function parsent(){
	const v = document.querySelector( 'input' ).value;
	const f = v/100;
    update( f.toString() )
}