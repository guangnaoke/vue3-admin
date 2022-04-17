<template>
  <section class="dashboard">
    <el-row :gutter="12">
      <el-col :span="6" v-for="item in info" :key="item.title">
        <el-card shadow="always">
          <section :class="item.style">
            <header>
              <div class="title">
                <label>{{ item.title }}</label>
              </div>
              <div class="icon">
                <svg-icon :name="item.icon" font-size="24px" />
              </div>
            </header>
            <footer v-if="item.stat">
              <div class="num">
                <label>{{ item.num }}</label>
              </div>
            </footer>
            <footer v-else>
              <div class="online">
                <div class="text">
                  <svg-icon name="point-green" font-size="24px" />
                  <span>online</span>
                </div>
                <label>{{ item.online }}</label>
              </div>
              <div class="offline">
                <div class="text">
                  <svg-icon name="point-red" font-size="24px" />
                  <span>offline</span>
                </div>
                <label>{{ item.offline }}</label>
              </div>
            </footer>
          </section>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="margin-top: 20px">
        <el-card shadow="always">
          <section class="used-space">
            <div class="title">
              <label>Reported Usage</label>
              <svg-icon name="usage" font-size="20px" />
            </div>
            <div class="size">
              <label>79</label>
              <span>MiB</span>
            </div>
          </section>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="margin-top: 20px">
        <el-card shadow="always">
          <section class="servers">
            <div class="title">
              <label>Servers(1)</label>
            </div>
            <div class="url">
              <label>192.168.0.1:9000</label>
            </div>
            <div class="servers-contarner">
              <div class="item" v-for="item in servers" :key="item.title">
                <div class="icon">
                  <svg-icon :name="item.icon" font-size="30px" />
                  <span>{{ item.title }}</span>
                </div>
                <div class="content">
                  <label>{{ item.content }}</label>
                </div>
              </div>
            </div>
          </section>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { getDashboardInfo } from '@/api'
import { ref } from 'vue'
import mock from '../../../mock/index.js'

export default {
  name: 'DashboardIndex',
  setup() {
    const info = ref([])
    const servers = ref([])

    if (process.env.NODE_ENV === 'development') {
      getDashboardInfo().then((res) => {
        info.value = res.data.info
        servers.value = res.data.servers
      })
    } else {
      const res = mock[0].response()
      info.value = res.data.info
      servers.value = res.data.servers
    }

    return { info, servers }
  }
}
</script>

<style lang="scss" scoped>
.bucket {
  background: linear-gradient(
      -15deg,
      rgb(39, 129, 176) 0%,
      rgb(255, 255, 255) 30%
    )
    0% 0% no-repeat padding-box padding-box;
}
.object {
  background: linear-gradient(
      -15deg,
      rgb(76, 203, 146) 0%,
      rgb(255, 255, 255) 30%
    )
    0% 0% no-repeat padding-box padding-box;
}
.bucket,
.object,
.servers,
.drives {
  display: flex;
  flex-direction: column;
  height: 200px;
  footer {
    flex: 1;
  }
  header {
    display: flex;
    height: 50px;
    .title,
    .icon {
      flex: 1;
    }
    .title {
      font-size: 20px;
    }
    .icon {
      text-align: right;
    }
  }
  footer {
    display: flex;
    .num {
      font-size: 60px;
      label {
        font-weight: 500;
      }
    }
    .online,
    .offline {
      flex: 1;
      text-align: center;
      .svg-icon {
        vertical-align: middle;
      }
      label {
        font-size: 60px;
      }
    }
  }
}
.used-space {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  .title,
  .size {
    flex: 1;
  }
  .title {
    font-size: 20px;
    .svg-icon {
      margin-left: 5px;
    }
  }
  .size {
    font-size: 60px;
    span {
      margin-left: 5px;
      font-size: 26px;
    }
  }
}
.servers {
  display: flex;
  flex-direction: column;
  height: 200px;
  .title {
    height: 30px;
  }
  .url {
    margin-bottom: 20px;
    font-size: 20px;
    label {
      color: #67c23a;
    }
  }
  .servers-contarner {
    display: flex;
    .item {
      flex: 1;
      .icon {
        .svg-icon {
          vertical-align: sub;
        }
        span {
          margin-left: 5px;
          color: rgb(94, 94, 94);
        }
      }
      .content {
        margin: 10px 0 0 30px;
      }
    }
  }
}
</style>
