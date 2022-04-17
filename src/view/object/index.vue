<template>
  <div class="object-list">
    <div class="upload">
      <el-upload
        :action="`${appDomain}/api/object/upload`"
        :data="uploadInfo.data"
        :headers="uploadInfo.headers"
        :show-file-list="false"
        :on-success="onSuccess"
        :on-error="onError"
      >
        <el-button type="primary" size="default">Click to upload</el-button>
      </el-upload>
    </div>
    <el-table
      :data="filterTableData"
      style="width: 100%"
      :stripe="true"
      :border="true"
    >
      <el-table-column label="Name" prop="name" />
      <el-table-column label="LastModified" prop="last_modified" />
      <el-table-column label="Size" prop="size" />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="uploadInfo.search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleDownload(scope.$index, scope.row)"
            >download</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <a
      :href="uploadInfo.path"
      :download="uploadInfo.object"
      ref="file"
      hidden
    />
  </div>
</template>
<script>
import { ref, computed, nextTick, reactive } from 'vue'
import { listObjects, downloadFile, removeObject } from '@/api'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatFileSize } from '@/utils/validate'
import { getToken } from '@/utils/auth'
import { userStore } from '@/store'
import { appDomain } from '@/utils/set-request-address'

export default {
  name: 'ObjectIndex',
  setup() {
    const route = useRoute()
    const bucket = route.query.bucket
    const tableData = ref([])
    const file = ref(null)
    const store = userStore()

    const uploadInfo = reactive({
      search: '',
      path: '',
      object: '',
      data: {
        bucket
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'X-role': store.access
      }
    })

    const list = () => {
      listObjects(bucket).then((res) => {
        if (res.status === 1) {
          tableData.value = res.data
        } else {
          ElMessage.error('获取列表失败')
        }
      })
    }

    list()

    const filterTableData = computed(() =>
      tableData.value.filter((data) => {
        data.size = formatFileSize(data.size)
        return (
          !uploadInfo.search ||
          data.name.toLowerCase().includes(uploadInfo.search.toLowerCase())
        )
      })
    )

    const handleDownload = (index, row) => {
      downloadFile({ bucket, object: row.name }).then((res) => {
        if (res.status === 1) {
          uploadInfo.object = row.name
          uploadInfo.path = res.data
          nextTick(() => {
            file.value.click()
          })
        } else {
          ElMessage.error('下载失败')
        }
      })
    }

    const handleDelete = (index, row) => {
      ElMessageBox.confirm(
        'The file will be permanently deleted. continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          removeObject({ bucket, object: row.name }).then((res) => {
            if (res.status === -1) {
              ElMessage.error('删除失败')
            } else {
              list()
              ElMessage.success('文件已删除')
            }
          })
        })
        .catch(() => {})
    }

    const onSuccess = () => {
      list()
      ElMessage.success('上传成功')
    }

    const onError = () => {
      ElMessage.error('上传失败')
    }

    return {
      uploadInfo,
      filterTableData,
      handleDownload,
      onSuccess,
      onError,
      handleDelete,
      file,
      appDomain
    }
  }
}
</script>

<style scoped>
.upload {
  margin-bottom: 20px;
}
</style>
