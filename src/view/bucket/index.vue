<template>
  <el-row :gutter="12">
    <el-col :span="6" v-for="item in buckets" :key="item.name">
      <el-card shadow="always">
        <div class="card">
          <div class="info">
            <div class="name">
              <label>{{ item.name }}</label>
            </div>
            <div class="time">
              <svg-icon name="create-time" font-size="20px" />
              {{ item.creationDate }}
            </div>
          </div>
          <div class="btn">
            <el-button type="primary" size="small" @click="toBucket(item.name)"
              >进入</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { onMounted, ref } from 'vue'
import { bucketList } from '@/api'
import { useRouter } from 'vue-router'

export default {
  name: 'BucketIndexl',
  setup() {
    const buckets = ref({})
    const router = useRouter()

    onMounted(() => {
      bucketList().then((res) => {
        buckets.value = res.data
      })
    })

    const toBucket = (bucket) => {
      router.push(`/object/index?bucket=${bucket}`)
    }

    return { buckets, toBucket }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  .info {
    flex: 1;
  }
  .btn {
    width: 100px;
    line-height: 4;
    text-align: right;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name,
    .time {
      flex: 1;
      line-height: 2;
      font-size: 14px;
      .svg-icon {
        margin-right: 10px;
        vertical-align: sub;
      }
    }
    .name {
      font-size: 20px;
      font-weight: bolder;
    }
  }
}
</style>
