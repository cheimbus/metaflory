# metafloris
## 1. 서비스 개요
- 본 서비스는 작가들을 모집해, 해당 작가들의 꽃 이미지를 블록체인 기술을 이용하여 NFT를 발급하여 이더리움으로 판매하거나 꽃 이미지와 메세지가 담긴 카드를 선물할 수 있는 서비스를 제공합니다.   
- 아직 결제 시스템 개발이 완료가 되지 않아 도메인은 추후에 제공될 예정입니다.
- 나아가 꽃 라운지를 만들거나, 구독서비스를 제공할 예정입니다.
## 2. 개발 기간
2022.10.26 ~
## 3. 개발환경
  - `NestJS v9.1.2`
  - `MySQL v8.028`
  - `Node v16.17.0`
  - `npm v8.15.0`
  - `TypeORM v0.39`
## 4. 데이터베이스 다이어그램
<img width="1035" height="900" alt="스크린샷 2022-11-29 오전 12 08 45" src="https://user-images.githubusercontent.com/87293880/204312406-fd836fe9-5d21-4c67-89e1-1aeb52f249fd.png">    

## 5. 웹 페이지
> 메인 페이지 배너
<img width="1035" alt="스크린샷 2022-11-29 오전 12 14 02" src="https://user-images.githubusercontent.com/87293880/204317763-eb9bc3a0-4ff5-441c-ba5f-c1193e9cd17f.png">

> 메인 페이지 작가 컬렉션
<img width="1035" alt="스크린샷 2022-11-29 오전 12 40 55" src="https://user-images.githubusercontent.com/87293880/204319466-f58d88f8-c840-4f80-8346-37497a746cb1.png">

> 메인 페이지 꽃선물카드
<img width="1035" alt="스크린샷 2022-11-29 오전 12 36 15" src="https://user-images.githubusercontent.com/87293880/204318307-030b77ed-e249-4d52-9ad4-3a78ca9a6968.png">

> 메인 페이지 꽃NFT
<img width="1035" alt="스크린샷 2022-11-29 오전 12 15 06" src="https://user-images.githubusercontent.com/87293880/204318382-e69737a2-42b6-4fe7-bbb0-9fcec016a332.png">

> 상품 목록
<img width="1035" alt="스크린샷 2022-11-29 오전 12 15 36" src="https://user-images.githubusercontent.com/87293880/204318484-394d7895-2d68-4e8d-ae62-1db975bbba61.png">

> 상품 뷰
<img width="1035" alt="스크린샷 2022-11-29 오전 10 44 05" src="https://user-images.githubusercontent.com/87293880/204420422-c74787ef-9ac6-4218-9b17-27474de8c5a4.png">


> 소개 페이지
<img width="1035" alt="스크린샷 2022-11-29 오전 12 15 45" src="https://user-images.githubusercontent.com/87293880/204318552-8cf93020-b5cb-44f6-8102-0acc889ff775.png">

## 6. swagger
> swagger api문서는 v1/api에서 확인 가능합니다.

> 예시
<img width="1035" alt="스크린샷 2022-11-29 오전 12 47 09" src="https://user-images.githubusercontent.com/87293880/204321173-d2598b83-d078-4b07-8a56-caab19195b02.png">
<img width="1035" alt="스크린샷 2022-11-29 오전 12 47 41" src="https://user-images.githubusercontent.com/87293880/204321210-e90f66a3-fc8e-4343-80e8-99495b142061.png">
<img width="1035" alt="스크린샷 2022-11-29 오전 12 47 53" src="https://user-images.githubusercontent.com/87293880/204321241-214044e0-e1a2-4b29-9a96-30cc4db4a764.png">

## 7. 구현목록
> 대표적으로 구현에 신경쓴 목록입니다.
- OAuth2.0 카카오 소셜로그인을 이용하여 사용자 로그인 구현
  - 

