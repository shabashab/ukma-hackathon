<script lang="ts" setup>
const emit = defineEmits(["login"]);

const supabase = useSupabaseClient();
const router = useRouter();
const taost = useToast();

const signUpLoading = ref<boolean>(false);

const signUpFormData = reactive({
  email: "",
  password: "",
  passwordRepeat: "",
});

const onSignUpButtonClick = async () => {
  signUpLoading.value = true;

  const res = await supabase.auth.signUp({
    email: signUpFormData.email,
    password: signUpFormData.password,
  });

  if (res.error) {
    taost.add({
      severity: "error",
      summary: "Sign up error",
      detail: res.error.message,
      life: 3000,
    });
    return;
  }

  taost.add({
    severity: "success",
    summary: "Successful sign up",
    detail: "You can now log in with your email and password",
    life: 3000,
  });

  emit("login");

  signUpLoading.value = false;
  
  return;
};
</script>

<template>
  <div
    class="flex flex-col items-stretch text-center gap-4 w-[400px] bg-light-200 px-6 py-5 rounded-xl"
  >
    <h1 class="text-black/70">Sign up</h1>
    <InputText v-model="signUpFormData.email" placeholder="E-mail" />
    <Password
      placeholder="Password"
      input-class="w-full"
      v-model="signUpFormData.password"
      toggle-mask
    />
    <Password
      placeholder="Repeat password"
      input-class="w-full"
      toggle-mask
      v-model="signUpFormData.passwordRepeat"
      :feedback="false"
    />
    <Button @click="onSignUpButtonClick"> Sign up </Button>
    <Button @click="emit('login')" text>Log in</Button>
  </div>
</template>

<style lang="scss" scoped></style>
