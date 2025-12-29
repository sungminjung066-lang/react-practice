# Lecture 27: React Hook Form

## 📚 학습 목표

React Hook Form은 React에서 폼을 쉽고 효율적으로 관리할 수 있는 라이브러리입니다.

### React Hook Form의 장점

1. **성능 최적화**: 불필요한 리렌더링 최소화
2. **간단한 사용법**: 적은 코드로 복잡한 폼 관리
3. **유연한 Validation**: 다양한 검증 규칙 지원
4. **작은 번들 사이즈**: 경량 라이브러리
5. **TypeScript 지원**: 완벽한 타입 안정성

## 📖 주요 개념

### 1. useForm Hook

```typescript
const { register, handleSubmit, formState: { errors } } = useForm();
```

- `register`: 입력 필드를 등록
- `handleSubmit`: 폼 제출 핸들러
- `formState`: 폼 상태 (errors, isSubmitting, isDirty 등)
- `watch`: 특정 필드 값 감시
- `setValue`: 필드 값 설정
- `reset`: 폼 초기화

### 2. register 사용법

```typescript
<input {...register("name")} />
<input {...register("email", { required: true })} />
```

### 3. Validation 옵션

```typescript
{
  required: "필수 항목입니다",
  minLength: { value: 3, message: "최소 3자 이상" },
  maxLength: { value: 20, message: "최대 20자 이하" },
  pattern: { value: /regex/, message: "형식이 올바르지 않습니다" },
  validate: (value) => value !== "admin" || "사용할 수 없는 이름입니다"
}
```

## 📂 예제 파일 구성

1. **BasicFormExample.tsx** - 기본 사용법
2. **ValidationExample.tsx** - 유효성 검사
3. **WatchExample.tsx** - 값 감시 및 조건부 필드
4. **DynamicFieldsExample.tsx** - 동적 필드 추가/제거
5. **ComplexFormExample.tsx** - 종합 예제 (회원가입)

## 🔗 공식 문서

https://react-hook-form.com/

## 💡 기존 방식 vs React Hook Form

### 기존 방식 (useState)

```typescript
const [name, setName] = React.useState('');
const [email, setEmail] = React.useState('');
const [errors, setErrors] = React.useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  // 수동 검증
  if (!name) setErrors(prev => ({ ...prev, name: '필수' }));
  if (!email) setErrors(prev => ({ ...prev, email: '필수' }));
  // ...
};

// 각 입력마다 onChange 핸들러 필요
<input value={name} onChange={(e) => setName(e.target.value)} />
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

**문제점:**
- 입력할 때마다 컴포넌트 리렌더링
- 보일러플레이트 코드가 많음
- 검증 로직을 직접 작성해야 함

### React Hook Form 방식

```typescript
const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  console.log(data);
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("name", { required: "필수 항목입니다" })} />
  {errors.name && <span>{errors.name.message}</span>}
  
  <input {...register("email", { required: "필수 항목입니다" })} />
  {errors.email && <span>{errors.email.message}</span>}
</form>
```

**장점:**
- 입력 시 리렌더링 없음 (Uncontrolled Component 사용)
- 간결한 코드
- 자동 검증
- 성능 최적화

## 🎯 실습 순서

1. BasicFormExample.tsx 실행 및 코드 분석
2. ValidationExample.tsx로 검증 규칙 학습
3. WatchExample.tsx로 값 감시 방법 학습
4. DynamicFieldsExample.tsx로 동적 필드 추가 학습
5. ComplexFormExample.tsx로 실전 폼 구현 연습

---

**react-hook-form을 마스터하면 폼 개발 시간이 크게 단축됩니다! 🚀**

