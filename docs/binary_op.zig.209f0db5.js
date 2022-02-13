var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   22","line":"const AssignError = @import(\"../errors/assign_error.zig\").AssignError;"},
{"lineNum":"   23","line":"const GenericError = @import(\"../errors/generic_error.zig\").GenericError;"},
{"lineNum":"   24","line":"const OpError = @import(\"../errors/op_error.zig\").OpError;"},
{"lineNum":"   25","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   26","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   27","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   28","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   29","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   30","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   31","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"fn isLValue(nd: node.Node) bool {","class":"lineCov","hits":"1","order":"3678","possible_hits":"1",},
{"lineNum":"   34","line":"    return switch (nd.getType()) {","class":"lineCov","hits":"3","order":"3679","possible_hits":"3",},
{"lineNum":"   35","line":"        .Ident, .Dot, .ArrayAccess => true,","class":"lineCov","hits":"1","order":"3680","possible_hits":"1",},
{"lineNum":"   36","line":"        else => false,","class":"lineCov","hits":"1","order":"6877","possible_hits":"1",},
{"lineNum":"   37","line":"    };"},
{"lineNum":"   38","line":"}"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"pub fn inferBinaryOpType(","class":"lineCov","hits":"1","order":"3647","possible_hits":"1",},
{"lineNum":"   41","line":"    cmp: *Compiler,"},
{"lineNum":"   42","line":"    nd: node.Node,"},
{"lineNum":"   43","line":"    ctx: *const InferContext,"},
{"lineNum":"   44","line":"    op: node.BinaryOp,"},
{"lineNum":"   45","line":") InferResult {"},
{"lineNum":"   46","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"3648","possible_hits":"1",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    const left = switch (inferExprType(cmp, op.left, &subCtx)) {","class":"linePartCov","hits":"1","order":"3649","possible_hits":"2",},
{"lineNum":"   49","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"3667","possible_hits":"1",},
{"lineNum":"   50","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"    };"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    const right = switch (inferExprType(cmp, op.right, &subCtx)) {","class":"linePartCov","hits":"1","order":"3668","possible_hits":"2",},
{"lineNum":"   54","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"3669","possible_hits":"1",},
{"lineNum":"   55","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"    };"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"    if (!right.isAssignableTo(left))","class":"lineCov","hits":"2","order":"3670","possible_hits":"2",},
{"lineNum":"   59","line":"        return InferResult.err(CompileError.assignError(","class":"lineCov","hits":"1","order":"5115","possible_hits":"1",},
{"lineNum":"   60","line":"            AssignError.new(nd.csr, left, right),","class":"lineCov","hits":"1","order":"5114","possible_hits":"1",},
{"lineNum":"   61","line":"        ));"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"    const entry = cmp.typebook.getOpEntry(op.op);","class":"lineCov","hits":"1","order":"3671","possible_hits":"1",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    // We assume it\'s binary, otherwise the Node wouldn\'t have parsed"},
{"lineNum":"   66","line":"    std.debug.assert(entry == null or entry.?.getType() == .Binary);","class":"linePartCov","hits":"1","order":"3672","possible_hits":"2",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    if (entry == null or !left.isAssignableTo(entry.?.Binary.input))","class":"linePartCov","hits":"2","order":"3675","possible_hits":"3",},
{"lineNum":"   69","line":"        return InferResult.err(CompileError.opError(OpError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"            nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"            op.op,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"            left,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"        )));"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    if (entry.?.Binary.isAssign) {","class":"linePartCov","hits":"2","order":"3676","possible_hits":"3",},
{"lineNum":"   76","line":"        if (!isLValue(op.left)) {","class":"lineCov","hits":"2","order":"3677","possible_hits":"2",},
{"lineNum":"   77","line":"            return InferResult.err(","class":"lineCov","hits":"1","order":"6880","possible_hits":"1",},
{"lineNum":"   78","line":"                CompileError.genericError(GenericError.new(","class":"lineCov","hits":"1","order":"6879","possible_hits":"1",},
{"lineNum":"   79","line":"                    nd.csr,","class":"lineCov","hits":"1","order":"6878","possible_hits":"1",},
{"lineNum":"   80","line":"                    \"Invalid assignment - target expression is not an l-value\","},
{"lineNum":"   81","line":"                )),"},
{"lineNum":"   82","line":"            );"},
{"lineNum":"   83","line":"        }"},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"        if (op.left.getType() == .Ident) {","class":"lineCov","hits":"2","order":"3681","possible_hits":"2",},
{"lineNum":"   86","line":"            const sym = cmp.scope.get(op.left.data.Ident);","class":"linePartCov","hits":"2","order":"5107","possible_hits":"3",},
{"lineNum":"   87","line":"            std.debug.assert(sym != null);","class":"lineCov","hits":"1","order":"5108","possible_hits":"1",},
{"lineNum":"   88","line":"            if (sym.?.isConst) {","class":"linePartCov","hits":"2","order":"5109","possible_hits":"3",},
{"lineNum":"   89","line":"                return InferResult.err(","class":"lineCov","hits":"1","order":"5346","possible_hits":"1",},
{"lineNum":"   90","line":"                    CompileError.genericError(GenericError.new(","class":"lineCov","hits":"1","order":"5345","possible_hits":"1",},
{"lineNum":"   91","line":"                        nd.csr,","class":"lineCov","hits":"1","order":"5342","possible_hits":"1",},
{"lineNum":"   92","line":"                        cmp.fmt(","class":"lineCov","hits":"2","order":"5343","possible_hits":"2",},
{"lineNum":"   93","line":"                            \"Invalid assignment - {s} is const\","},
{"lineNum":"   94","line":"                            .{op.left.data.Ident},","class":"linePartCov","hits":"2","order":"5344","possible_hits":"3",},
{"lineNum":"   95","line":"                        ),"},
{"lineNum":"   96","line":"                    )),"},
{"lineNum":"   97","line":"                );"},
{"lineNum":"   98","line":"            }"},
{"lineNum":"   99","line":"        }"},
{"lineNum":"  100","line":"    }"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"    nd.ty = if (entry.?.Binary.output) |out| out else left;","class":"linePartCov","hits":"1","order":"3682","possible_hits":"2",},
{"lineNum":"  103","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"3683","possible_hits":"2",},
{"lineNum":"  104","line":"}"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"test \"can infer type of binary op expressions\" {","class":"lineCov","hits":"3","order":"6859","possible_hits":"3",},
{"lineNum":"  107","line":"    const int = node.makeNode(","class":"lineCov","hits":"1","order":"6861","possible_hits":"1",},
{"lineNum":"  108","line":"        std.testing.allocator,"},
{"lineNum":"  109","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6860","possible_hits":"1",},
{"lineNum":"  110","line":"        .Int,"},
{"lineNum":"  111","line":"        \"3\","},
{"lineNum":"  112","line":"    );"},
{"lineNum":"  113","line":"    defer std.testing.allocator.destroy(int);","class":"linePartCov","hits":"1","order":"6867","possible_hits":"2",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6866","possible_hits":"2",},
{"lineNum":"  116","line":"        .expectedTy = .Number,"},
{"lineNum":"  117","line":"    }).run(.BinaryOp, node.BinaryOp{","class":"lineCov","hits":"1","order":"6865","possible_hits":"1",},
{"lineNum":"  118","line":"        .op = .Add,","class":"lineCov","hits":"1","order":"6864","possible_hits":"1",},
{"lineNum":"  119","line":"        .left = int,","class":"lineCov","hits":"1","order":"6862","possible_hits":"1",},
{"lineNum":"  120","line":"        .right = int,","class":"lineCov","hits":"1","order":"6863","possible_hits":"1",},
{"lineNum":"  121","line":"    });"},
{"lineNum":"  122","line":"}"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"test \"left-hand side of an assignment must be an l-value\" {","class":"lineCov","hits":"3","order":"6868","possible_hits":"3",},
{"lineNum":"  125","line":"    const alloc = std.testing.allocator;"},
{"lineNum":"  126","line":"    const csr = Cursor.new(0, 0);","class":"lineCov","hits":"1","order":"6869","possible_hits":"1",},
{"lineNum":"  127","line":"    const nodes = &[_]node.Node{","class":"lineCov","hits":"1","order":"6872","possible_hits":"1",},
{"lineNum":"  128","line":"        node.makeNode(alloc, csr, .Int, \"3\"),","class":"lineCov","hits":"1","order":"6870","possible_hits":"1",},
{"lineNum":"  129","line":"        node.makeNode(alloc, csr, .Int, \"4\"),","class":"lineCov","hits":"1","order":"6871","possible_hits":"1",},
{"lineNum":"  130","line":"    };"},
{"lineNum":"  131","line":"    defer for (nodes) |n| std.testing.allocator.destroy(n);","class":"linePartCov","hits":"1","order":"6890","possible_hits":"2",},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6889","possible_hits":"2",},
{"lineNum":"  134","line":"        .check = (struct {"},
{"lineNum":"  135","line":"            pub fn check(","class":"lineCov","hits":"1","order":"6882","possible_hits":"1",},
{"lineNum":"  136","line":"                scope: *Scope,"},
{"lineNum":"  137","line":"                typebook: *TypeBook,"},
{"lineNum":"  138","line":"                res: InferResult,"},
{"lineNum":"  139","line":"            ) !void {","class":"lineCov","hits":"1","order":"6888","possible_hits":"1",},
{"lineNum":"  140","line":"                _ = scope;"},
{"lineNum":"  141","line":"                _ = typebook;"},
{"lineNum":"  142","line":"                try std.testing.expect(res.getType() == .Error);","class":"lineCov","hits":"1","order":"6883","possible_hits":"1",},
{"lineNum":"  143","line":"                const err = res.Error;","class":"linePartCov","hits":"2","order":"6884","possible_hits":"3",},
{"lineNum":"  144","line":"                try std.testing.expect(err.getType() == .GenericError);","class":"linePartCov","hits":"1","order":"6885","possible_hits":"2",},
{"lineNum":"  145","line":"                try std.testing.expectEqualStrings(","class":"linePartCov","hits":"1","order":"6887","possible_hits":"2",},
{"lineNum":"  146","line":"                    \"Invalid assignment - target expression is not an l-value\","},
{"lineNum":"  147","line":"                    err.GenericError.msg,","class":"linePartCov","hits":"2","order":"6886","possible_hits":"3",},
{"lineNum":"  148","line":"                );"},
{"lineNum":"  149","line":"            }"},
{"lineNum":"  150","line":"        }).check,"},
{"lineNum":"  151","line":"    }).run(.BinaryOp, node.BinaryOp{","class":"lineCov","hits":"1","order":"6876","possible_hits":"1",},
{"lineNum":"  152","line":"        .op = .Assign,","class":"lineCov","hits":"1","order":"6875","possible_hits":"1",},
{"lineNum":"  153","line":"        .left = nodes[0],","class":"lineCov","hits":"1","order":"6873","possible_hits":"1",},
{"lineNum":"  154","line":"        .right = nodes[1],","class":"lineCov","hits":"1","order":"6874","possible_hits":"1",},
{"lineNum":"  155","line":"    });"},
{"lineNum":"  156","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 14:13:43", "instrumented" : 65, "covered" : 59,};
var merged_data = [];
