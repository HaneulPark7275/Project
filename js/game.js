$(document).ready(function() {
    $('.message p').text("Player1: Throw the Yut");

    var move = 0;
    var turn = '.rmal';
    var nturn = '.bmal';
    var flag = 0;

    //rolling yut
    $('#roll').click(function() {
        var dice = 0;

        //put yut back in place
        $('.yut4').removeClass('nak');

        //disable roll button
        $('#roll').prop('disabled', true);

        $('.yut div').addClass('rotate');

        //yut logic
        setTimeout(function() {

            //set nak probabilty 1/10
            var nak = Math.floor(Math.random() * 9) + 1;
            if (nak == 5) {
                $('.yut4').addClass('nak');
            }

            var random1, random2, random3, random4;

            //random number between 1 or 2 for each yut
            for (var i = 1; i <= 4; i++) {
                eval('random' + i + '= Math.floor(Math.random() * 2) + 1;');

                var ran = eval('random' + i);

                if (ran == 1) {
                    $('.yut' + i).removeClass('active');
                } else {
                    $('.yut' + i).addClass('active');
                    dice++;
                }
            }

            $('.yut div').removeClass('rotate');

            //calculate move
            if ($('.yut4').hasClass('nak')) {
                $('.message p').html("Nak (0)");
                move = 0;
            } else if (dice == 0) {
                $('.message p').html("Mo (5)");
                flag++;
                move = 5;
            } else if (dice == 1) {
                if ($('.yut4').hasClass('active')) {
                    $('.message p').html("Back Do (-1)");
                    move = -1;
                } else {
                    $('.message p').html("Do (1)");
                    move = 1;
                }
            } else if (dice == 2) {
                $('.message p').html("Gae (2)");
                move = 2;
            } else if (dice == 3) {
                $('.message p').html("Gul (3)");
                move = 3;
            } else if (dice == 4) {
                $('.message p').html("Yut (4)");
                flag++;
                move = 4;
            }
            enablePieceSelection();
        }, 510);
    });

    function enablePieceSelection() {
        $(turn).addClass('selectable');

        $('.selectable').on('click', function() {
            var currentStepId = parseInt($(this).attr('value'));
            var tookShortcut = parseInt($(this).attr('short'));
            var newStepId;

            //shortcut logic
            if(currentStepId + move === 5){ //enter shortcut
                newStepId = 100;
                tookShortcut++;
                $(this).attr('short', tookShortcut);
            }
            else if(currentStepId + move === 99){ //leave shortcut (backdo)
                newStepId = 4;
                tookShortcut--;
                $(this).attr('short', tookShortcut);
            }
            else if(currentStepId + move === 10){ //enter shortcut
                newStepId = 200;
                tookShortcut = 5;
                $(this).attr('short', tookShortcut);
            }
            else if(currentStepId + move === 199){ //leave shortcut (backdo)
                newStepId = 9;
                tookShortcut = 1;
                $(this).attr('short', tookShortcut);
            }
            else if(currentStepId + move === 103){ //enter shortcut
                newStepId = 203;
                tookShortcut += 5;
                $(this).attr('short', tookShortcut);
            }
            else if(currentStepId + move === 202){ //leave shortcut (backdo)
                if(tookShortcut === 5){
                    newStepId = 202;
                }
                else{
                    newStepId = 102;
                    tookShortcut -= 5;
                    $(this).attr('short', tookShortcut);
                }
            }
            else if(currentStepId + move >= 15 && currentStepId + move < 100){ //left bottom side logic
                newStepId = currentStepId + move + 91;
                tookShortcut++;
            }
            else if(currentStepId + move === 105){ //left bottom side logic (backdo)
                if(tookShortcut === 3){
                    newStepId = 105;
                }
                else{
                    newStepId = 14;
                }
            }
            else if(currentStepId + move >= 111 && currentStepId + move < 200){ // piece ends
                newStepId = currentStepId + move + 889;
            }
            else if(currentStepId + move >= 206 && currentStepId + move < 300){ // piece ends
                newStepId = currentStepId + move + 794;
            }
            else if(currentStepId + move === 999){ // right bottom side logic
                if(tookShortcut >= 5){
                    newStepId = 205;
                }
                else{
                    newStepId = 110;
                }
            }
            else if(currentStepId + move === 0 && tookShortcut === 1){ // when backdo value is 0
                newStepId = 1000;
            }
            else if(currentStepId + move === -1){ // backdo when value is 0
                newStepId = 110;
            }
            else{ //default
                newStepId = currentStepId + move;
            }

            console.log(newStepId);
            $(this).attr('value', newStepId);

            //peices in step
            var opponentPiecesInStep = $('.step#' + newStepId).children(nturn);
            var piecesInStep = $('.step#'+currentStepId).children(turn);
            
            //move peices
            if (currentStepId === 0){
                $(this).appendTo('.step#' + newStepId);
                $(this).attr('short', 1);
            }
            else if(newStepId > 1000){
                piecesInStep.remove();
            }
            else{ //for all the pieces in same step
                piecesInStep.appendTo('.step#' + newStepId);

                if(currentStepId + move === 0 && tookShortcut === 1){
                    piecesInStep.attr('value', 0);
                    piecesInStep.attr('short', 0);
                }
                else{
                    piecesInStep.attr('value', newStepId);
                    piecesInStep.attr('short', tookShortcut);
                }
                
            }            

            //piece grabs the opponent
            if(opponentPiecesInStep.length > 0){
                opponentPiecesInStep.attr('value', 0);
                opponentPiecesInStep.attr('short', 0);
                opponentPiecesInStep.appendTo(nturn + 's');
                flag++;
            }

            $(turn).removeClass('selectable');
            $(turn).off('click');

            // Check the turn
            if(flag === 0){
                if(turn === '.rmal'){
                    turn = '.bmal';
                    nturn = '.rmal';
                    $('.message p').text("Player2: Throw the Yut");
                }
                else{
                    turn = '.rmal';
                    nturn = '.bmal';
                    $('.message p').text("Player1: Throw the Yut");
                }
            }
            else{
                flag--;
            }

            //enable roll button
            $('#roll').prop('disabled', false);

            // Check if the game has ended
            if($('.rmal').length === 0){
                $('.message p').text("Player2 wins!");
                $('#roll').prop('disabled', true);
            }
            else if($('.bmal').length === 0){
                $('.message p').text("Player1 wins!");
                $('#roll').prop('disabled', true);
            }
        });
    }
});
