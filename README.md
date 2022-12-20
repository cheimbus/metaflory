# metafloris
## 1. 서비스 개요
- 본 서비스는 꽃 이미지를 판매할 작가들을 모집을 합니다. 
- 해당 작가들의 꽃 이미지를 블록체인 기술을 이용하여 NFT를 발급해서 이더리움으로 판매하거나, 꽃 이미지와 메세지가 함께 담긴 카드를 선물할 수 있는 서비스를 제공합니다.  
- 아직 결제 시스템 개발이 완료가 되지 않아 도메인은 추후에 제공될 예정입니다.
- NFT 관련 코드는 제외하였습니다.
- 나아가 꽃 라운지를 만들거나, 구독서비스를 제공할 예정입니다.
- 개발 중단
## 2. 개발 기간
2022.10.26 ~ 중단
## 3. 개발 인원 & 역할
- 총 2명
- 본인 server API개발
## 4. 개발환경
  - `NestJS v9.1.2`
  - `MySQL v8.028`
  - `Node v16.17.0`
  - `npm v8.15.0`
  - `TypeORM v0.39`
## 5. 데이터베이스 다이어그램
<img width="1035" height="900" alt="스크린샷 2022-11-29 오전 12 08 45" src="https://user-images.githubusercontent.com/87293880/204312406-fd836fe9-5d21-4c67-89e1-1aeb52f249fd.png">    

## 6. 웹 페이지
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

## 7. API 문서
> swagger는 v1/api에서 자세히 확인 할 수 있습니다.

> 예시
<img width="1035" alt="스크린샷 2022-11-29 오전 12 47 09" src="https://user-images.githubusercontent.com/87293880/204321173-d2598b83-d078-4b07-8a56-caab19195b02.png">
<img width="1035" alt="스크린샷 2022-11-29 오전 12 47 41" src="https://user-images.githubusercontent.com/87293880/204321210-e90f66a3-fc8e-4343-80e8-99495b142061.png">
<img width="1035" alt="스크린샷 2022-11-29 오후 1 33 12" src="https://user-images.githubusercontent.com/87293880/204439600-f49801db-aeaf-41b4-8abc-b542f1fe543a.png">


## 8. 구현목록
- OAuth2.0 카카오 소셜로그인을 이용하여 사용자 로그인 구현 및 유효성검사
  - 로그인 시 동시에 서버 자체에서 JWT를 생성하였습니다. 이를 이용하여 유효성 검사를 진행하였습니다.
  - 다른 플랫폼을 추가로 적용할 가능성이 있기때문에 (ex google, naver ...)이를 고려하여 코드를 작성하였습니다.
---
- 메인페이지에서는 꽃선물카드, 작가컬렉션, 꽃NFT 순으로 나열되어 있습니다.
  - 꽃선물카드, 꽃NFT는 메인페이지에서 2가지 방법으로 나열이 됩니다.
  - 첫 번째, 최근 등록된 상품 3가지를 나열합니다.
  - 두 번째, 가장 인기있는 상품 3가지를 나열합니다.
    - 여기서 인기있는 상품은 조회수에 따라 나눠집니다.
  - 작가컬렉션도 마찬가지로 가장 인기있는 작가 3분을 나열합니다.
    - 작가컬렉션은 해당 작가의 대표 이미지를 보여줍니다. (수정도 가능합니다.)
    - 여기서 인기있는 작가를 구별하는 방법은, 각각 작가의 작품들의 조회수를 합산한 값이 작가의 조회수가 됩니다. 따라서 가장 높은 조회수 3개를 나열하게 됩니다.
    - 전체 작가를 봤을 때도 조회수가 높은 순서로 작가가 나열됩니다.
---
- 관리자, 사용자를 구별하였습니다.
  - 관리자는 상품등록, 작가등록, 수정, 삭제 등을 하기 때문에 사용자는 접근할 수 없습니다. 따라서 관리자 로그인을 만들었고, 유효성검사를 할 수 있게 구현하였습니다.
  - 사용자는 상품을 볼 때 제약이 없습니다. 다만, 상품을 구매하기 위해서는 로그인을 통해 유효성검사를 마쳐야합니다.
  
## 9. 저작권
- Copyright 2022 [METAFLORIS](https://github.com/cheimbus) All rights reserved.
