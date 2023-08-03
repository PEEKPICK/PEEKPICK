# 부담없는 취향 공유 공간! PEEKPICK 👀


## 협업전략
### Commit Comvention

|태그|설명|예시|
|:--:|:--:|:--:|
|Feat|새로운 기능 추가|Feat: 피커 거리순 찾기 기능 추가|
|Fix|버그 수정|Fix: 거리 지정 불가 수정|
|Build|빌드 관련 파일 수정|Build: Docker파일 수정|
|Docs|문서 추가/수정/삭제|Docs: 리드미 수정|
|Style|코드형식 변경(비즈니스 로직 변경 ❌)|Style: 피커 서비스 코드형식 변경|
|Refactor|코드 리팩토링|Refactor: 피커 비즈니스 로직 리팩토링|
|Test|테스트|Refactor: 회원가입 테스트|
|Chore|기타 변경사항|Chore: 공백 제거|

### Branch
- master : 배포<br>
- develop/be : 배포 전 백엔드 병합<br>
- develop/fe  : 배포 전 프론트엔드 병합<br>
- feature/be/[기능명] : 백엔드 기능 개발
- feature/fe/[기능명] : 프론트엔드 기능 개발
- hotfix/be/[기능명] : 급한 백엔드 에러 수정<br>
- hotfix/fe/[기능명] : 급한 프론트엔드 에러 수정<br>