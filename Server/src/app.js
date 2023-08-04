const query = require('./db/mysql')
const data = require('./tmp.json').list

// Run
// const doRun = setInterval(function() {
//     console.log(query("SELECT * FROM meal"))
// }, 10000);

/* 
svarCd	string	휴게소코드
svarNm	string	휴게소명
routeCd	string	노선코드
routeNm	string	노선명
hdqrCd	string	본부코드
hdqrNm	string	본부명
mtnofCd	string	지사코드
mtnofNm	string	지사명
svarGsstClssCd	string	휴게소/주유소구분코드
svarGsstClssNm	string	휴게소/주유소구분명
gudClssCd	string	상하행구분코드
gudClssNm	string	상하행구분명
pstnoCd	string	우편번호
svarAddr	string	휴게소주소
cocrPrkgTrcn	string	소형차주차대수
fscarPrkgTrcn	string	대형차주차대수
dspnPrkgTrcn	string	장애인주차대수
bsopAdtnlFcltCd	string	영업부대시설코드
rprsTelNo	string	대표전화번호
code	string	결과
message	string	결과 메시지
count	string	전체 결과 수
*/
var svarCd = ''
var svarNm = ''
var hdqrCd = ''
var mtnofCd = ''
var pstnoCd = ''
var routeCd = ''
var svarAddr = ''
var gudClssCd = ''
var rprsTelNo = ''
var dspnPrkgTrcn = ''
var cocrPrkgTrcn = ''
var fscarPrkgTrcn = ''
var svarGsstClssCd = ''


var hdqrList = []
var mtnofList = []
var routeList = []
var gudClssList = []

for(idx in data) {
    svarCd += data[idx].svarCd + '*'
    svarNm += data[idx].svarNm + '*'
    hdqrCd += data[idx].hdqrCd + '*'
    mtnofCd += data[idx].mtnofCd + '*'
    pstnoCd += data[idx].pstnoCd + '*'
    routeCd += data[idx].routeCd + '*'
    svarAddr += data[idx].svarAddr + '*'
    gudClssCd += data[idx].gudClssCd + '*'
    rprsTelNo += data[idx].rprsTelNo + '*'
    dspnPrkgTrcn += data[idx].dspnPrkgTrcn + '*'
    cocrPrkgTrcn += data[idx].cocrPrkgTrcn + '*'
    fscarPrkgTrcn += data[idx].fscarPrkgTrcn + '*'
    svarGsstClssCd += data[idx].svarGsstClssCd + '*'

    hdqrList.push([data[idx].hdqrCd, data[idx].hdqrNm])
    mtnofList.push([data[idx].mtnofCd, data[idx].mtnofNm])
    routeList.push([data[idx].routeCd, data[idx].routeNm])
    gudClssList.push([data[idx].gudClssCd, data[idx].gudClssNm])
}

query(`CALL SET_RESTAREA(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [svarCd, svarNm, hdqrCd, mtnofCd, pstnoCd, routeCd, svarAddr, gudClssCd, rprsTelNo, dspnPrkgTrcn, cocrPrkgTrcn, fscarPrkgTrcn, svarGsstClssCd])

hdqrList = getDistinctList(hdqrList)
mtnofList = getDistinctList(mtnofList)
routeList = getDistinctList(routeList)
gudClssList = getDistinctList(gudClssList)

function getDistinctList(list) {
    return list.map(JSON.stringify).filter((e, i, a) => i === a.indexOf(e)).map(JSON.parse)
}

console.log(mtnofList)
console.log(routeList)
console.log(gudClssList)

/*
		"CREATE TABLE restarea("
			+ "restID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, "
			+ "svarCd VARCHAR(6) NOT NULL, "
			+ "svarNm VARCHAR(999) NOT NULL, "
			+ "hdqrCd VARCHAR(6) NOT NULL, "
			+ "mtnofCd VARCHAR(6) NOT NULL, "
			+ "pstnoCd VARCHAR(6) NOT NULL, "
			+ "routeCd VARCHAR(4) NOT NULL, "
			+ "svarAddr VARCHAR(999) NOT NULL, "
			+ "gudClssCd INTEGER NOT NULL, "
			+ "rprsTelNo VARCHAR(15), "
			+ "dspnPrkgTrcn INTEGER NOT NULL, "
			+ "cocrPrkgTrcn INTEGER NOT NULL, "
			+ "fscarPrkgTrcn INTEGER NOT NULL, "
			+ "svarGsstClssCd INTEGER NOT NULL, "
			+ "updateDate DATETIME NOT NULL)"


CREATE DEFINER=`root`@`localhost` PROCEDURE `SET_RESTAREA`(
	svarCd VARCHAR(5000), 
    svarNm VARCHAR(16000), 
    hdqrCd VARCHAR(5000), 
    mtnofCd VARCHAR(5000), 
    pstnoCd VARCHAR(5000), 
    routeCd VARCHAR(5000), 
    svarAddr VARCHAR(16000), 
    gusClssCd VARCHAR(5000), 
    rprsTelNo VARCHAR(10000), 
    dspnPrkgTrcn VARCHAR(5000), 
    cocrPrkgTrcn VARCHAR(5000), 
    fscarPrkgTrcn VARCHAR(5000), 
    svarGsstClssCd VARCHAR(5000)
)
BEGIN
	DECLARE _svarCd VARCHAR(100);
    DECLARE _svarNm VARCHAR(100);
    DECLARE _hdqrCd VARCHAR(100);
    DECLARE _mtnofCd VARCHAR(100);
    DECLARE _pstnoCd VARCHAR(100);
    DECLARE _routeCd VARCHAR(100);
    DECLARE _svarAddr VARCHAR(100);
    DECLARE _gusClssCd VARCHAR(100);
    DECLARE _rprsTelNo VARCHAR(100);
    DECLARE _dspnPrkgTrcn VARCHAR(100);
    DECLARE _cocrPrkgTrcn VARCHAR(100);
    DECLARE _fscarPrkgTrcn VARCHAR(100);
    DECLARE _svarGsstClssCd VARCHAR(100);
    
    _loop: LOOP 
		-- '*' 문자로 끊어서 값 가져오기
		SET _svarCd = SUBSTRING_INDEX(svarCd, '*', 1);
		SET _svarNm = SUBSTRING_INDEX(svarNm, '*', 1);
        SET _hdqrCd = SUBSTRING_INDEX(hdqrCd, '*', 1);
        SET _mtnofCd = SUBSTRING_INDEX(mtnofCd, '*', 1);
        SET _pstnoCd = SUBSTRING_INDEX(pstnoCd, '*', 1);
        SET _routeCd = SUBSTRING_INDEX(routeCd, '*', 1);
        SET _svarAddr = SUBSTRING_INDEX(svarAddr, '*', 1);
        SET _gusClssCd = SUBSTRING_INDEX(gusClssCd, '*', 1);
        SET _rprsTelNo = SUBSTRING_INDEX(rprsTelNo, '*', 1);
        SET _dspnPrkgTrcn = SUBSTRING_INDEX(dspnPrkgTrcn, '*', 1);
        SET _cocrPrkgTrcn = SUBSTRING_INDEX(cocrPrkgTrcn, '*', 1);
        SET _fscarPrkgTrcn = SUBSTRING_INDEX(fscarPrkgTrcn, '*', 1);
        SET _svarGsstClssCd = SUBSTRING_INDEX(svarGsstClssCd, '*', 1);
        
        -- 가져온 값은 원본에서 삭제함
        SET svarCd = RIGHT(svarCd, CHAR_LENGTH(svarCd) - CHAR_LENGTH(_svarCd) - 1);
        SET svarNm = RIGHT(svarNm, CHAR_LENGTH(svarNm) - CHAR_LENGTH(_svarNm) - 1);
        SET hdqrCd = RIGHT(hdqrCd, CHAR_LENGTH(hdqrCd) - CHAR_LENGTH(_hdqrCd) - 1);
        SET mtnofCd = RIGHT(mtnofCd, CHAR_LENGTH(mtnofCd) - CHAR_LENGTH(_mtnofCd) - 1);
        SET pstnoCd = RIGHT(pstnoCd, CHAR_LENGTH(pstnoCd) - CHAR_LENGTH(_pstnoCd) - 1);
        SET routeCd = RIGHT(routeCd, CHAR_LENGTH(routeCd) - CHAR_LENGTH(_routeCd) - 1);
        SET svarAddr = RIGHT(svarAddr, CHAR_LENGTH(svarAddr) - CHAR_LENGTH(_svarAddr) - 1);
        SET gusClssCd = RIGHT(gusClssCd, CHAR_LENGTH(gusClssCd) - CHAR_LENGTH(_gusClssCd) - 1);
        SET rprsTelNo = RIGHT(rprsTelNo, CHAR_LENGTH(rprsTelNo) - CHAR_LENGTH(_rprsTelNo) - 1);
        SET dspnPrkgTrcn = RIGHT(dspnPrkgTrcn, CHAR_LENGTH(dspnPrkgTrcn) - CHAR_LENGTH(_dspnPrkgTrcn) - 1);
        SET cocrPrkgTrcn = RIGHT(cocrPrkgTrcn, CHAR_LENGTH(cocrPrkgTrcn) - CHAR_LENGTH(_cocrPrkgTrcn) - 1);
        SET fscarPrkgTrcn = RIGHT(fscarPrkgTrcn, CHAR_LENGTH(fscarPrkgTrcn) - CHAR_LENGTH(_fscarPrkgTrcn) - 1);
        SET svarGsstClssCd = RIGHT(svarGsstClssCd, CHAR_LENGTH(svarGsstClssCd) - CHAR_LENGTH(_svarGsstClssCd) - 1);
        
        -- break
        -- rprsTelNo 등록되어 있지 않을 수 있음
        IF CHAR_LENGTH(_svarCd) = 0 OR CHAR_LENGTH(_svarNm) = 0 OR CHAR_LENGTH(_hdqrCd) = 0 OR CHAR_LENGTH(_mtnofCd) = 0 
			OR CHAR_LENGTH(_pstnoCd) = 0 OR CHAR_LENGTH(_routeCd) = 0 OR CHAR_LENGTH(_svarAddr) = 0 OR CHAR_LENGTH(_gusClssCd) = 0 /*OR CHAR_LENGTH(_rprsTelNo) = 0 *//*
			OR CHAR_LENGTH(_dspnPrkgTrcn) = 0 OR CHAR_LENGTH(_cocrPrkgTrcn) = 0 OR CHAR_LENGTH(_fscarPrkgTrcn) = 0 OR CHAR_LENGTH(_svarGsstClssCd) = 0 THEN
			LEAVE _loop;
        END IF;
        
        -- _svarCd 값이 없으면 INSERT
        IF (SELECT COUNT(restID) FROM restarea WHERE restarea.svarCd = _svarCd) = 0 THEN
            -- TRIM() 앞/뒤 공백 제거
			INSERT INTO restarea(
				svarCd, svarNm, hdqrCd, mtnofCd, pstnoCd, routeCd, svarAddr, 
                gudClssCd, rprsTelNo, dspnPrkgTrcn, cocrPrkgTrcn, fscarPrkgTrcn, svarGsstClssCd, updateDate) 
            VALUES(
				TRIM(_svarCd), _svarNm, TRIM(_hdqrCd), TRIM(_mtnofCd), TRIM(_pstnoCd), TRIM(_routeCd), _svarAddr, 
                _gusClssCd, _rprsTelNo, _dspnPrkgTrcn, _cocrPrkgTrcn, _fscarPrkgTrcn, _svarGsstClssCd, NOW());
		ELSE 
            UPDATE restarea r 
			SET 
				r.svarNm = _svarNm, 
                r.hdqrCd = TRIM(_hdqrCd),
				r.mtnofCd = TRIM(_mtnofCd),
				r.pstnoCd = TRIM(_pstnoCd),
				r.routeCd = TRIM(_routeCd),
				r.svarAddr = _svarAddr,
				r.gudClssCd = _gusClssCd,
				r.rprsTelNo = _rprsTelNo,
                r.dspnPrkgTrcn = _dspnPrkgTrcn,
                r.cocrPrkgTrcn = _cocrPrkgTrcn,
                r.fscarPrkgTrcn = _fscarPrkgTrcn,
				r.svarGsstClssCd = _svarGsstClssCd,
				updateDate = NOW()
			WHERE
				r.svarCd = _svarCd;
        END IF;
        
        -- debug
        -- SELECT _svarCd, _svarNm, _hdqrCd, _mtnofCd, _pstnoCd, _routeCd, _svarAddr, CAST(_gusClssCd AS UNSiGNED), _rprsTelNo;
        
    END LOOP;
    
END
*/
